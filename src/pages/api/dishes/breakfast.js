const dishes = [
  {
    name: "Eggs Benedict",
    description:
      "Classic breakfast dish consisting of poached eggs and Canadian bacon on an English muffin, topped with hollandaise sauce.",
    cost: 12,
    rating: 4.5,
  },
  {
    name: "Pancakes",
    description:
      "Fluffy breakfast cakes made from batter and cooked on a griddle, typically served with butter and maple syrup.",
    cost: 10,
    rating: 4.7,
  },
  {
    name: "French Toast",
    description:
      "Slices of bread soaked in a mixture of eggs and milk, then fried until golden brown, often served with syrup or powdered sugar.",
    cost: 9,
    rating: 4.6,
  },
  {
    name: "Omelette",
    description:
      "Egg dish cooked with various fillings such as cheese, vegetables, and meats, folded over into a half-moon shape.",
    cost: 11,
    rating: 4.4,
  },
  {
    name: "Belgian Waffles",
    description:
      "Thick, fluffy waffles made from a yeast-based batter, typically served with whipped cream, fruit, and syrup.",
    cost: 13,
    rating: 4.8,
  },
  {
    name: "Bacon and Eggs",
    description:
      "Classic breakfast combination of crispy bacon strips and eggs prepared to your liking, such as fried, scrambled, or poached.",
    cost: 10,
    rating: 4.6,
  },
  {
    name: "Bagel with Lox",
    description:
      "Toasted bagel topped with cream cheese, smoked salmon (lox), capers, and thinly sliced red onions.",
    cost: 14,
    rating: 4.7,
  },
  {
    name: "Breakfast Burrito",
    description:
      "Tortilla filled with scrambled eggs, cheese, potatoes, and choice of breakfast meat, often served with salsa or hot sauce.",
    cost: 12,
    rating: 4.5,
  },
  {
    name: "Cinnamon Rolls",
    description:
      "Sweet rolls made from leavened dough filled with cinnamon, sugar, and butter, often topped with icing.",
    cost: 9,
    rating: 4.6,
  },
  {
    name: "Fruit Salad",
    description:
      "Assortment of fresh fruits, such as strawberries, grapes, melon, and pineapple, served in a bowl.",
    cost: 8,
    rating: 4.4,
  },
  {
    name: "Quiche",
    description:
      "Savory tart filled with a mixture of eggs, cream, cheese, and various ingredients such as vegetables, meats, or seafood.",
    cost: 12,
    rating: 4.5,
  },
  {
    name: "Granola with Yogurt",
    description:
      "Breakfast dish consisting of granola (rolled oats, nuts, and honey) served with yogurt and fresh fruit.",
    cost: 10,
    rating: 4.3,
  },
];

export default function handler(req, res) {
  res.status(200).json(dishes);
}
