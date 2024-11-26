import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, HelpCircle, FileQuestion, PhoneCall } from "lucide-react";
import Navbar from "@/components/shared/Navbar/Navbar";
import XIconBtn from "@/components/shared/XIconBtn";
import { faqs } from "@/constants";

const HelpAndSupport = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setSearchQuery(searchQuery.trim());
  };

  const filteredFaqs = useMemo(() => {
    if (!searchQuery) return faqs;
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="hero">
      <Navbar />
      <main className="help-support">
        <div className="container mx-auto">
          <div className="home-widget">
            <motion.h1
              className="text-4xl font-bold text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Aiuto e Supporto
            </motion.h1>

            <form onSubmit={handleSearch} className="mb-8">
              <div className="search-box flex items-center max-w-md mx-auto">
                <img
                  src="/icons/help-icon.png"
                  alt="help icon"
                  className="ml-1"
                />
                <Input
                  placeholder="Cerca aiuto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="widget-input text-sm sm:text-base"
                />
                {!!searchQuery && (
                  <XIconBtn
                    input={searchQuery}
                    handleRemoveInput={() => setSearchQuery("")}
                  />
                )}
                <Button
                  type="submit"
                  className="search-btn basis-1/2 xs:basis-1/3 max-w-[100px]"
                >
                  Cerca
                </Button>
              </div>
            </form>
          </div>

          <Tabs
            defaultValue="faq"
            className="home-widget mt-4 max-w-3xl mx-auto"
          >
            <TabsList
              className="grid w-full grid-cols-3 bg-home-widget-border-50 rounded-xl
            h-12"
            >
              <TabsTrigger
                value="faq"
                className="data-[state=active]:bg-home-widget-border-70 rounded-lg h-full"
              >
                <FileQuestion className="h-4 w-4 mr-2" />
                FAQ
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className="data-[state=active]:bg-home-widget-border-70 rounded-lg h-full"
              >
                <PhoneCall className="shrink-0 h-4 w-4 mr-2" />
                Contattaci
              </TabsTrigger>
              <TabsTrigger
                value="guide"
                className="data-[state=active]:bg-home-widget-border-70 rounded-lg h-full"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Guide
              </TabsTrigger>
            </TabsList>
            <TabsContent value="faq">
              <Card className="border-0">
                <CardHeader className="text-left">
                  <CardTitle>Domande Frequenti</CardTitle>
                  <CardDescription className="font-medium">
                    {searchQuery
                      ? `Risultati della ricerca per "${searchQuery}"`
                      : "Trova risposte alle domande più comuni."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {filteredFaqs.length ? (
                      filteredFaqs.map((faq, i) => (
                        <AccordionItem key={`item-${i}`} value={`item-${i}`}>
                          <AccordionTrigger>{faq.question}</AccordionTrigger>
                          <AccordionContent className="font-medium text-left">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))
                    ) : (
                      <p className="font-medium text-left">
                        Nessun risultato trovato per "{searchQuery}". Prova con
                        un'altra ricerca.
                      </p>
                    )}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="contact">
              <Card className="border-0">
                <CardHeader className="text-left">
                  <CardTitle>Contattaci</CardTitle>
                  <CardDescription className="font-medium">
                    Inviaci un messaggio e ti risponderemo al più presto.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name" className="text-left">
                          Nome
                        </Label>
                        <Input
                          id="name"
                          placeholder="Il tuo nome"
                          className="signup-form-input rounded-xl sm:py-7"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email" className="text-left">
                          Email
                        </Label>
                        <Input
                          id="email"
                          placeholder="La tua email"
                          type="email"
                          className="signup-form-input rounded-xl sm:py-7"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="message" className="text-left">
                          Messaggio
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Scrivi il tuo messaggio qui"
                          className="signup-form-input rounded-xl"
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="sm:flex-center sm:gap-2">
                  <Button
                    className="btn grow md:max-w-[200px] bg-blue-700 border-0 rounded-xl py-3 px-4
                        text-sm font-medium border-opacity-60
                            hover:bg-opacity-50 "
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Invia messaggio
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="guide">
              <Card className="border-0">
                <CardHeader className="text-left">
                  <CardTitle>Guide Utili</CardTitle>
                  <CardDescription className="font-medium">
                    Esplora le nostre guide per utilizzare al meglio la nostra
                    app.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2 text-left font-medium">
                    <li>Come effettuare il primo ordine</li>
                    <li>Guida alla personalizzazione dei piatti</li>
                    <li>Consigli per una consegna rapida</li>
                    <li>Come lasciare una recensione</li>
                    <li>Programma fedeltà: come funziona</li>
                  </ul>
                </CardContent>
                <CardFooter className="p-0 px-6">
                  <Button
                    className="w-full btn font-medium py-3 rounded-2xl
                  bg-home-widget-border-70 hover:bg-home-widget-border-80"
                  >
                    Visualizza tutte le guide
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};
export default HelpAndSupport;
