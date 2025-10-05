import { Link } from "react-router-dom";

export default function FooterContent() {
  return (
    <footer className="relative bg-gradient-to-b from-background/0 to-background">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent"></div>
      <div className="container px-6 py-12 mx-auto max-w-7xl md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">

          {/* Logo + descrição */}
          <div className="space-y-4">
            {/* <img src="/logo.png" alt="SDOCA Logo" className="h-8" /> */}
            <div className="flex flex-col">
              <span className="text-3xl font-medium text-secondary-foreground">
                S
                <span className="text-3xl text-accent-foreground">D</span>
                OCA
              </span>
              <span className="text-secondary-foreground">Serviços e Comércio, LDA</span>
            </div>
          </div>

          {/* Links rápidos */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Home</Link></li>
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">Sobre</Link></li>
              <li><Link to="/features" className="text-sm text-muted-foreground hover:text-foreground">Funcionalidades</Link></li>
              <li><Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Preços</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contato</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Siga-nos</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-foreground">LinkeIn</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Facebook</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-foreground">WhatsApp</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Instagram</Link></li>
            </ul>
          </div>

          {/* Contato (sem labels) */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Contato</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                Luanda, Urbanização Nova Vida<br />
                Rua nº 63, Edf MF3, 2º Andar, Apt nº 10
              </li>
              <li>
                <a href="mailto:info@sdoca.it.ao" className="hover:text-foreground">info@sdoca.it.ao</a><br />
                <a href="mailto:geral@sdoca.it.ao" className="hover:text-foreground">geral@sdoca.it.ao</a>
              </li>
              <li>
                <a href="tel:+244923678529" className="hover:text-foreground">+244 923 67 85 29</a><br />
                <a href="tel:+244927800505" className="hover:text-foreground">+244 927 80 05 05</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Política de Privacidade</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">Termos de Uso</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 mt-12 border-border">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SDOCA. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
