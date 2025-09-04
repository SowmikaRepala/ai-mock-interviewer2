export const plans = [
  {
    id: "free",
    name: "Free",
    cost: 0,
    paymentLink: null,
    offering: [
      { value: "Create 10 Free Mock Interview", included: true },
      { value: "Unlimited Retake Interview", included: true },
      { value: "Practice Question", included: false },
      { value: "MockInterview website unlimited Access", included: false },
      { value: "Email Support", included: false },
    ],
  },
  {
    id: "monthly",
    name: "Monthly",
    cost: 7.99,
    paymentLink: "https://buy.stripe.com/test_2809Ej...", // Stripe Checkout Link
    offering: [
      { value: "Create 10 Free Mock Interview", included: true },
      { value: "Unlimited Retake Interview", included: true },
      { value: "Practice Question", included: true },
      { value: "MockInterview website unlimited Access", included: true },
      { value: "Email Support", included: true },
    ],
  },
];
