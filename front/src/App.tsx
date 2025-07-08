import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Eye,
  Bell,
  BarChart3,
  Smartphone,
  Clock,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  CheckCircle,
  Zap,
} from "lucide-react"


export default function BikeSenseLanding() {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    entreprise: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Formulaire à brancher sur le backend
    alert('Demande envoyée ! Nous vous recontacterons bientôt.')
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="px-6 lg:px-8 h-16 flex items-center border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between max-w-7xl">
          <button onClick={() => scrollToSection('hero')} className="flex items-center justify-center">
            <Shield className="h-8 w-8 text-cyan-400" />
            <span className="ml-2 text-2xl font-bold text-white">BikeSense</span>
          </button>
          <nav className="flex gap-6 sm:gap-8">
            <button 
              onClick={() => scrollToSection('solution')} 
              className="text-sm font-medium hover:text-cyan-400 transition-colors text-zinc-300"
            >
              Solution
            </button>
            <button 
              onClick={() => scrollToSection('avantages')} 
              className="text-sm font-medium hover:text-cyan-400 transition-colors text-zinc-300"
            >
              Avantages
            </button>
            <button
              onClick={() => scrollToSection('fonctionnalites')}
              className="text-sm font-medium hover:text-cyan-400 transition-colors text-zinc-300"
            >
              Fonctionnalités
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-sm font-medium hover:text-cyan-400 transition-colors text-zinc-300"
            >
              Contact
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="w-full py-16 md:py-24 lg:py-32 xl:py-40 bg-gradient-to-br from-black via-zinc-900 to-cyan-950">
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_500px] lg:gap-16 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <Badge variant="secondary" className="w-fit bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                    🛡️ Protection intelligente pour votre commerce
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none text-white leading-tight">
                    Protégez votre magasin avec <span className="text-cyan-400">BikeSense</span>
                  </h1>
                  <p className="max-w-[600px] text-zinc-300 md:text-xl leading-relaxed">
                    Une solution simple et efficace pour surveiller votre boutique 24h/24. Recevez des alertes
                    instantanées en cas de problème et gardez un œil sur vos conditions de stockage.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Button 
                    size="lg" 
                    className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8 py-3"
                    onClick={() => scrollToSection('solution')}
                  >
                    Découvrir la solution
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 bg-transparent px-8 py-3"
                    onClick={() => scrollToSection('contact')}
                  >
                    Demander une démo
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400" />
                    <span>Installation rapide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400" />
                    <span>Support inclus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400" />
                    <span>Sans engagement</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative">
                  <div className="w-full max-w-[500px] h-[350px] lg:w-[500px] lg:h-[400px] mx-auto bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl shadow-2xl border border-cyan-500/30 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Shield className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-semibold">Dashboard BikeSense</p>
                      <p className="text-sm opacity-75">Interface de surveillance</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="solution" className="w-full py-16 md:py-24 lg:py-32 bg-zinc-950">
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
              <div className="space-y-4 max-w-4xl">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-white">
                  Une solution complète pour votre tranquillité d'esprit
                </h2>
                <p className="text-zinc-300 text-lg md:text-xl leading-relaxed">
                  BikeSense surveille automatiquement votre magasin et vous prévient immédiatement en cas d'anomalie
                </p>
              </div>
            </div>
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-8 max-w-6xl mx-auto">
              <Card className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900/80 transition-colors p-6">
                <CardHeader className="text-center pb-6">
                  <Eye className="h-12 w-12 mx-auto text-cyan-400 mb-4" />
                  <CardTitle className="text-white text-xl">Surveillance continue</CardTitle>
                  <CardDescription className="text-zinc-400 text-base leading-relaxed">
                    Gardez un œil sur votre magasin même quand vous n'y êtes pas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-zinc-300">
                    <li>• Contrôle de la température et humidité</li>
                    <li>• Détection des mouvements suspects</li>
                    <li>• Historique complet des événements</li>
                    <li>• Rapports automatiques</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900/80 transition-colors p-6">
                <CardHeader className="text-center pb-6">
                  <Bell className="h-12 w-12 mx-auto text-cyan-400 mb-4" />
                  <CardTitle className="text-white text-xl">Alertes instantanées</CardTitle>
                  <CardDescription className="text-zinc-400 text-base leading-relaxed">
                    Soyez prévenu immédiatement en cas de problème
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-zinc-300">
                    <li>• Notifications sur votre téléphone</li>
                    <li>• Alertes par email et SMS</li>
                    <li>• Paramétrage personnalisé</li>
                    <li>• Réaction en temps réel</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900/80 transition-colors p-6">
                <CardHeader className="text-center pb-6">
                  <Smartphone className="h-12 w-12 mx-auto text-cyan-400 mb-4" />
                  <CardTitle className="text-white text-xl">Contrôle à distance</CardTitle>
                  <CardDescription className="text-zinc-400 text-base leading-relaxed">
                    Accédez à toutes les informations depuis votre téléphone
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-zinc-300">
                    <li>• Application mobile simple</li>
                    <li>• Interface web intuitive</li>
                    <li>• Accès sécurisé 24h/24</li>
                    <li>• Partage avec votre équipe</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Avantages Section */}
        <section id="avantages" className="w-full py-16 md:py-24 lg:py-32 bg-black">
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
              <div className="space-y-4 max-w-4xl">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-white">
                  Pourquoi choisir BikeSense ?
                </h2>
                <p className="text-zinc-300 text-lg md:text-xl leading-relaxed">
                  Des avantages concrets pour votre business
                </p>
              </div>
            </div>
            <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
              <Card className="overflow-hidden border-zinc-800 bg-zinc-950/50">
                <div className="aspect-video relative bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-white" />
                </div>
                <CardHeader className="p-6">
                  <CardTitle className="text-white text-xl">Réduction des pertes</CardTitle>
                  <CardDescription className="text-zinc-400 text-base leading-relaxed">
                    Prévenez les vols et les dégâts liés aux mauvaises conditions de stockage
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-cyan-400">-80%</span>
                      <span className="text-sm text-zinc-400 ml-2">de pertes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-zinc-800 bg-zinc-950/50">
                <div className="aspect-video relative bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center">
                  <Clock className="h-16 w-16 text-white" />
                </div>
                <CardHeader className="p-6">
                  <CardTitle className="text-white text-xl">Gain de temps</CardTitle>
                  <CardDescription className="text-zinc-400 text-base leading-relaxed">
                    Plus besoin de vérifications manuelles constantes
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-cyan-400">5h/sem</span>
                      <span className="text-sm text-zinc-400 ml-2">économisées</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-zinc-800 bg-zinc-950/50">
                <div className="aspect-video relative bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center">
                  <TrendingUp className="h-16 w-16 text-white" />
                </div>
                <CardHeader className="p-6">
                  <CardTitle className="text-white text-xl">Tranquillité d'esprit</CardTitle>
                  <CardDescription className="text-zinc-400 text-base leading-relaxed">
                    Dormez sur vos deux oreilles, votre magasin est surveillé
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-cyan-400">24/7</span>
                      <span className="text-sm text-zinc-400 ml-2">protection</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="fonctionnalites" className="w-full py-16 md:py-20 lg:py-24 bg-zinc-950">
          <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-4 text-center">
              <div className="flex flex-col items-center space-y-3">
                <div className="text-4xl lg:text-5xl font-bold text-cyan-400">500+</div>
                <div className="text-sm lg:text-base text-zinc-400">Magasins protégés</div>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <div className="text-4xl lg:text-5xl font-bold text-cyan-400">99.9%</div>
                <div className="text-sm lg:text-base text-zinc-400">Fiabilité</div>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <div className="text-4xl lg:text-5xl font-bold text-cyan-400">30s</div>
                <div className="text-sm lg:text-base text-zinc-400">Installation</div>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <div className="text-4xl lg:text-5xl font-bold text-cyan-400">24/7</div>
                <div className="text-sm lg:text-base text-zinc-400">Support client</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-16 md:py-24 lg:py-32 bg-black">
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                    Prêt à protéger votre magasin ?
                  </h2>
                  <p className="text-zinc-300 text-lg md:text-xl leading-relaxed">
                    Contactez-nous pour une démonstration gratuite et sans engagement
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-5 w-5 text-cyan-400" />
                    <span className="text-zinc-300">123 Avenue de la Tech, 75001 Paris</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="h-5 w-5 text-cyan-400" />
                    <span className="text-zinc-300">01 23 45 67 89</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-cyan-400" />
                    <span className="text-zinc-300">contact@bikesense.fr</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Zap className="h-5 w-5 text-cyan-400" />
                    <span className="text-zinc-300">Réponse sous 2h en moyenne</span>
                  </div>
                </div>
              </div>
              <Card className="border-zinc-800 bg-zinc-950/50">
                <CardHeader className="p-8 pb-6">
                  <CardTitle className="text-white text-xl">Demande de démonstration</CardTitle>
                  <CardDescription className="text-zinc-400 text-base leading-relaxed">
                    Laissez-nous vos coordonnées, nous vous recontactons rapidement
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleInputChange}
                        placeholder="Prénom"
                        className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-400 h-11"
                        required
                      />
                      <Input
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        placeholder="Nom"
                        className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-400 h-11"
                        required
                      />
                    </div>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email professionnel"
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-400 h-11"
                      required
                    />
                    <Input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      placeholder="Téléphone"
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-400 h-11"
                      required
                    />
                    <Input
                      name="entreprise"
                      value={formData.entreprise}
                      onChange={handleInputChange}
                      placeholder="Nom de votre entreprise"
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-400 h-11"
                      required
                    />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="flex min-h-[100px] w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-3 text-sm text-white ring-offset-background placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      placeholder="Parlez-nous de votre projet..."
                    />
                    <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold h-11">
                      Demander une démo gratuite
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-3 sm:flex-row py-8 w-full shrink-0 items-center px-6 lg:px-8 border-t border-zinc-800 bg-black">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between max-w-7xl gap-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-cyan-400" />
            <span className="font-bold text-white">BikeSense</span>
          </div>
          <p className="text-xs text-zinc-500">© 2024 BikeSense. Tous droits réservés.</p>
          <nav className="flex gap-6">
            <button className="text-xs hover:text-cyan-400 transition-colors text-zinc-400">
              Mentions légales
            </button>
            <button className="text-xs hover:text-cyan-400 transition-colors text-zinc-400">
              CGV
            </button>
            <button className="text-xs hover:text-cyan-400 transition-colors text-zinc-400">
              Confidentialité
            </button>
          </nav>
        </div>
      </footer>
    </div>
  )
}
