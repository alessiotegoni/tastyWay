import ConfirmAddressDialog from "@/components/custom/restaurant/ConfirmAddressDialog";
import PaymentErrorAlert from "@/components/custom/restaurant/PaymentErrorAlert";
import RestaurantCart from "@/components/custom/restaurant/RestaurantCart";
import RestaurantHeader from "@/components/custom/restaurant/RestaurantHeader";
import RestauranItemsList from "@/components/custom/restaurant/RestaurantItemsList";
import FiltersPopover from "@/components/shared/FiltersPopover";
import Navbar from "@/components/shared/Navbar/Navbar";
import RestaurantHeaderSkeleton from "@/components/skeletons/RestaurantHeaderSkeleton";
import { Input } from "@/components/ui/input";
import { restaurantItemFilters } from "@/config/filtersConfig";
import useAddress from "@/hooks/useAddress";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
import { useCreateCheckoutSession } from "@/lib/react-query/mutations/userMutations";
import {
  useGetRestaurantInfo,
  useGetRestaurantItems,
} from "@/lib/react-query/queries/restaurantQueries";
import {
  RestaurantItemsFilters,
  RestaurantItemsTypes,
} from "@/types/restaurantTypes";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { showErrorToast } from "@/lib/utils";

const defaultItemsFilters: RestaurantItemsFilters = {
  name: null,
  itemsTypes: [],
};

const Restaurant = () => {
  const { isAuthenticated, user } = useAuth();
  const { selectedAddress } = useAddress();

  const [itemsFilters, setItemsFilters] = useState(defaultItemsFilters);
  const [isErrAlertOpen, setIsErrAlertOpen] = useState(false);
  const [isCADOpen, setIsCADOpen] = useState(false); // CAD = confirm address dialog

  const { pathname } = useLocation();
  const { restaurantName } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("failed")) setIsErrAlertOpen(true);
  }, [searchParams]);

  useEffect(() => {
    if (user?.isCmpAccount)
      toast({
        description:
          "Puoi solamente guardare come sono strutturati gli altri ristoranti",
      });
  }, []);

  const {
    data: restaurant,
    isLoading: isLoadingInfo,
    isSuccess,
  } = useGetRestaurantInfo(restaurantName);
  const { data: restaurantItems, isLoading: isLoadingItems } =
    useGetRestaurantItems(restaurant?._id, itemsFilters);

  const { mutateAsync: createSession, isPending: isCreatingSession } =
    useCreateCheckoutSession();

  const { restaurantCartItems, handleSetCart, cartItems } = useCart(
    restaurantItems,
    restaurant?._id
  );

  const handleCreateSession = async () => {
    if (!isAuthenticated || !user)
      return navigate(`/signin?redirect=${pathname}`);

    if (
      !restaurant ||
      !selectedAddress ||
      user.isCmpAccount ||
      isCreatingSession ||
      !restaurantCartItems.length
    )
      return;

    try {
      if (!user.emailVerified)
        throw new Error(
          "Prima di ordinare devi verificare la tua email, puoi farlo andando sul tuo profilo"
        );

      const sessionUrl = await createSession({
        restaurantId: restaurant._id,
        itemsIds: cartItems[restaurant._id],
        address: selectedAddress,
      });

      window.location.href = sessionUrl;
    } catch (err) {
      showErrorToast({
        err,
        description: "Errore nel redirect alla pagina di pagamento",
      });
    }
  };

  const handleSetFilters = (currentValue?: RestaurantItemsTypes) =>
    setItemsFilters({
      ...itemsFilters,
      itemsTypes: currentValue ? [currentValue] : [],
    });

  const cartEl = isSuccess && !user?.isCmpAccount && (
    <RestaurantCart
      restaurantId={restaurant._id}
      deliveryPrice={restaurant.deliveryInfo.price}
      restaurantCartItems={restaurantCartItems}
      handleSetCart={handleSetCart}
      openCAD={() => setIsCADOpen(true)}
    />
  );

  return (
    <div className="hero">
      <Navbar pageNum={4} />
      <main className="restaurant pt-0">
        <PaymentErrorAlert
          isOpen={isErrAlertOpen}
          onClose={() => {
            setIsErrAlertOpen(false);
            setSearchParams({});
          }}
          onRetry={() => handleCreateSession()}
        />
        <ConfirmAddressDialog
          disabled={!restaurantCartItems.length}
          handleCreateSession={handleCreateSession}
          isPending={isCreatingSession}
          isOpen={isCADOpen}
          onClose={() => setIsCADOpen(false)}
        />
        <img
          src="/imgs/restaurants-bg.png"
          alt="restaurants-bg-img"
          className="bg-img"
        />
        <div
          className={`mx-auto ${
            user?.isCmpAccount ? "max-w-[600px]" : "md:max-w-[1000px]"
          }`}
        >
          <div className="row flex gap-3">
            <div className="col grow md:basis-[640px]">
              {!isLoadingInfo && restaurant ? (
                <RestaurantHeader {...restaurant} />
              ) : (
                <RestaurantHeaderSkeleton />
              )}
              <div className="sm:flex-between mb-3 sm:mb-0">
                <div
                  className="bg-home-widget border border-home-widget-border-30
                rounded-[50px] p-2 px-5 flex-center gap-3 my-3 backdrop-blur-[123px]
                font-medium"
                >
                  <SearchIcon />
                  <Input
                    onChange={(e) =>
                      setItemsFilters({ ...itemsFilters, name: e.target.value })
                    }
                    placeholder="Cerca"
                    className="bg-transparent"
                  />
                </div>
                {isSuccess && !!restaurant.itemsTypes.length && (
                  <div className="flex-between">
                    <FiltersPopover
                      filters={restaurantItemFilters.filter((itemFilter) =>
                        restaurant.itemsTypes.includes(itemFilter.value)
                      )}
                      setFilters={handleSetFilters}
                    />
                    <div className="block md:hidden">{cartEl}</div>
                  </div>
                )}
              </div>
              <RestauranItemsList
                restaurantId={restaurant?._id}
                restaurantItems={restaurantItems}
                isLoading={isLoadingItems}
              />
            </div>
            {!user?.isCmpAccount && (
              <div
                className="hidden md:block col sticky top-7 bg-home-widget
                  border border-primary-20 backdrop-blur-[123px] rounded-[30px]
                  p-5 h-fit basis-[350px]"
              >
                {cartEl}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default Restaurant;
