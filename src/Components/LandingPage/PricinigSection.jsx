import { motion } from "framer-motion";

const PricingSection = () => {
    const pricingPlans = [
        {
            title: "Basic",
            price: "Free",
            features: [
                "Access to public movies",
                "Limited favorites",
                "Standard resolution",
            ],
            highlighted: false,
        },
        {
            title: "Plus",
            price: "$4.99/mo",
            features: [
                "Unlimited favorites",
                "HD quality",
                "Early access to trailers",
                "No ads",
            ],
            highlighted: true,
        },
        {
            title: "Pro",
            price: "$9.99/mo",
            features: [
                "All Plus features",
                "4K Streaming",
                "Exclusive releases",
                "Offline watch",
            ],
            highlighted: false,
        },
    ];

    return (
        <section className="py-20 px-6">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Pricing Plans</h2>
                <p className="text-gray-500 text-lg">
                    Choose a plan that fits your binge-watching needs.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {pricingPlans.map((plan, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className={`rounded-xl shadow-lg p-6 ${plan.highlighted ? "bg-gradient-to-br from-indigo-500 to-pink-500 text-white scale-105" : "bg-white text-black"
                            } transition `}
                    >
                        <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                        <p className="text-3xl font-extrabold mb-6">{plan.price}</p>
                        <ul className="space-y-2 mb-6">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    ✅ <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <button
                            className={` cursor-pointer w-full py-2 rounded font-semibold ${plan.highlighted
                                    ? "bg-white text-black hover:bg-gray-100"
                                    : "bg-red-400 text-white hover:bg-red-500"
                                }`}
                        >
                            {plan.highlighted ? "Get Plus" : "Choose Plan"}
                        </button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default PricingSection;
