import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51NMpYQHSSk5PUSp2b10wREZS4qGkg2oLUtz5EaErFQOizK9snpglnVylmA7MENL6591l0Q5jZlKpVpF2VrbA0fKC00EpmnU7kr"
);

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        line_items: req.body.map((item) => {
          const img = item.image.asset._ref;

          const newImage = img
            .replace("image-", "https://cdn.sanity.io/images/ty4u56ms/production/")
            .replace("-jpg", ".jpg");

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: false,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cart`,
      };

      //checkout session
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("method not allowed");
  }
}
