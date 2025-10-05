import { Check, Minus, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: 'Lite',
    description: 'Plano mais básico que temos',
    price: 60.000,
    features: [
      { name: 'SSO', value: true },
      { name: 'AI Assistant', value: false },
      { name: 'Version Control', value: false },
      { name: 'Members', value: 5 },
      { name: 'Multiplayer Mode', value: false },
    ]
  },
  {
    name: 'Medium',
    description: 'Plano pouco mais robusto',
    price: 110.000,
    features: [
      { name: 'SSO', value: true },
      { name: 'AI Assistant', value: true },
      { name: 'Version Control', value: true },
      { name: 'Members', value: 10 },
      { name: 'Multiplayer Mode', value: false },
    ]
  },
  {
    name: 'Professional',
    description: 'Plano mais completo',
    price: 180.000,
    features: [
      { name: 'SSO', value: true },
      { name: 'AI Assistant', value: true },
      { name: 'Version Control', value: true },
      { name: 'Members', value: 5 },
      { name: 'Multiplayer Mode', value: true },
    ]
  }
]

const featuresList = [
  'SSO',
  'AI Assistant',
  'Version Control',
  'Members',
  'Multiplayer Mode'
]

export default function PlanContent() {
  return (
    <>
      {/* versão mobile */}
      <div className="container flex flex-col w-full px-4 pt-10 md:hidden">
        {plans.map((plan, planIndex) => (
          <div
            key={plan.name}
            className={cn(
              "flex flex-col py-10 relative border-x border-b first:border-t-0 last:border-b-0",
              planIndex === 0 && "mt-0",
            )}
          >
            {/* Cabeçalho do plano */}
            <div className="gap-2 px-4 ">
              <p className="text-2xl text-accent-foreground">{plan.name}</p>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
              <p className="flex items-center justify-center gap-2 mt-4 text-xl">
                <span className="text-3xl font-semibold text-secondary-foreground">
                  AOA {plan.price}
                </span>
                <span className="text-sm text-muted-foreground">/ mês</span>
              </p>
            </div>

            {/* Lista de features */}
            <div className="px-2 mt-6">
              {featuresList.map((featureName, idx) => {
                const feature = plan.features.find(f => f.name === featureName)

                return (
                  <div
                    key={featureName}
                    className={cn(
                      "flex justify-between items-center px-4 py-3 border-",
                      idx === featuresList.length - 1 && "border-b-" // remove borda no último
                    )}
                  >
                    <span className="text-sm text-secondary-foreground">
                      {featureName}
                    </span>

                    {feature?.value === true && (
                      <Check className="w-4 h-4 text-accent-foreground" />
                    )}

                    {feature?.value === false && (
                      <Minus className="w-4 h-4 text-primary" />
                    )}

                    {typeof feature?.value === "number" && (
                      <p className="text-sm text-muted-foreground">
                        {feature.value} membros
                      </p>
                    )}
                  </div>
                )
              })}

              <Button variant="outline" className="w-full mt-6">
                Assinar agora <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* versão middle */}
      <div className="container hidden gap-6 px-4 pt-20 md:grid-cols-3 md:grid lg:hidden">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "flex flex-col py-10 relative border-x first:border-t-0 last:border-b-0"
            )}
          >
            {/* Cabeçalho do plano */}
            <div className="gap-2 px-4 ">
              <p className="text-2xl text-accent-foreground">{plan.name}</p>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
              <p className="flex items-center justify-center gap-2 mt-4 text-xl">
                <span className="text-3xl font-semibold text-secondary-foreground">
                  AOA {plan.price}
                </span>
                <span className="text-sm text-muted-foreground">/ mês</span>
              </p>
            </div>

            {/* Lista de features */}
            <div className="px-2 mt-6">
              {featuresList.map((featureName, idx) => {
                const feature = plan.features.find(f => f.name === featureName)

                return (
                  <div
                    key={featureName}
                    className={cn(
                      "flex justify-between items-center px-4 py-3",
                      idx === featuresList.length - 1 && "border-b-0"
                    )}
                  >
                    <span className="text-sm text-secondary-foreground">
                      {featureName}
                    </span>

                    {feature?.value === true && (
                      <Check className="w-4 h-4 text-accent-foreground" />
                    )}

                    {feature?.value === false && (
                      <Minus className="w-4 h-4 text-primary" />
                    )}

                    {typeof feature?.value === "number" && (
                      <p className="text-sm text-muted-foreground">
                        {feature.value} membros
                      </p>
                    )}
                  </div>
                )
              })}

              <Button variant="outline" className="w-full mt-6">
                Assinar agora <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* versão desktop */}
      <div className="container hidden w-full pt-20 text-left divide-x lg:grid lg:grid-cols-4">
        <div className="col-span-3 lg:col-span-1"></div>

        {plans.map((plan) => (
          <div className="flex flex-col gap-2 px-3 py-1 md:px-6 md:py-4">
            <p className="text-2xl text-accent-foreground">{plan.name}</p>
            <p className="text-sm text-muted-foreground">{plan.description}</p>
            <p className="flex flex-col gap-2 mt-8 text-xl lg:flex-row lg:items-center">
              <span className="text-4xl text-secondary-foreground">AOA {plan.price}</span>
              <span className="text-sm text-muted-foreground"> / mês</span>
            </p>
            <Button variant="outline" className="gap-4 mt-8">
              Assinar agora <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        ))}

        <div className="col-span-3 px-3 py-4 lg:px-6 lg:col-span-1 text-secondary-foreground">
          <b>Recurso</b>
        </div>

        <div></div>
        <div></div>
        <div></div>

        {featuresList.map((featureName) => (
          <>
            <div className="col-span-3 px-3 py-4 lg:px-6 lg:col-span-1">{featureName}</div>

            {plans.map((plan) => {
              const feature = plan.features.find((feature) => {
                return feature.name === featureName
              })

              return (
                <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
                  {feature?.value === true && <Check className="w-4 h-4 text-accent-foreground" />}

                  {feature?.value === false && <Minus className="w-4 h-4 text-primary" />}

                  {typeof feature?.value === 'number' && (
                    <p className="text-sm text-muted-foreground">
                      {feature.value} members
                    </p>
                  )}
                </div>
              )
            })}
          </>
        ))}
      </div>
    </>
  );
}