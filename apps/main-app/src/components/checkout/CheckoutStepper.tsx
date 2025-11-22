import { Check } from 'lucide-react';

interface CheckoutStepperProps {
  currentStep: number;
}

const steps = [
  { number: 1, title: 'Shipping', description: 'Enter your address' },
  { number: 2, title: 'Delivery', description: 'Choose shipping method' },
  { number: 3, title: 'Review', description: 'Confirm your order' },
];

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                  currentStep > step.number
                    ? 'bg-green-600 text-white'
                    : currentStep === step.number
                      ? 'bg-brand-primary text-white ring-4 ring-brand-primary/20'
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {currentStep > step.number ? (
                  <Check className="h-6 w-6" />
                ) : (
                  step.number
                )}
              </div>

              {/* Step Info */}
              <div className="mt-3 text-center">
                <div
                  className={`font-semibold text-sm ${
                    currentStep >= step.number
                      ? 'text-brand-navy'
                      : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </div>
                <div className="text-xs text-gray-500 hidden sm:block">
                  {step.description}
                </div>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-4 -mt-12">
                <div
                  className={`h-full transition-all ${
                    currentStep > step.number ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
