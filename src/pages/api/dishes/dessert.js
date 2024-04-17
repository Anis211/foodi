const dishes = [
  {
    name: "Chocolate Cake",
    description:
      "Rich and moist cake made with chocolate and often layered with chocolate frosting or ganache.",
    cost: 12,
    rating: 4.5,
  },
  {
    name: "Apple Pie",
    description:
      "Classic American pie made with a flaky pastry crust and filled with spiced apples, often served with vanilla ice cream.",
    cost: 10,
    rating: 4.7,
  },
  {
    name: "Cheesecake",
    description:
      "Rich and creamy dessert consisting of a sweetened cream cheese filling on a graham cracker or cookie crust, often topped with fruit or sauce.",
    cost: 9,
    rating: 4.6,
  },
  {
    name: "Tiramisu",
    description:
      "Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cheese, dusted with cocoa powder.",
    cost: 11,
    rating: 4.4,
  },
  {
    name: "Creme Brulee",
    description:
      "French dessert consisting of a rich custard base topped with a layer of caramelized sugar.",
    cost: 13,
    rating: 4.8,
  },
  {
    name: "Brownies",
    description:
      "Dense, chewy chocolate squares made with cocoa powder, often containing nuts or chocolate chips.",
    cost: 10,
    rating: 4.6,
  },
  {
    name: "Key Lime Pie",
    description:
      "Southern American pie made with a tangy filling of key lime juice and sweetened condensed milk, baked in a graham cracker crust.",
    cost: 14,
    rating: 4.7,
  },
  {
    name: "Ice Cream Sundae",
    description:
      "Dessert dish consisting of scoops of ice cream topped with syrup, whipped cream, nuts, and a cherry.",
    cost: 12,
    rating: 4.5,
  },
  {
    name: "Carrot Cake",
    description:
      "Moist cake made with grated carrots and spices, often layered with cream cheese frosting and decorated with nuts or grated carrots.",
    cost: 11,
    rating: 4.6,
  },
  {
    name: "Panna Cotta",
    description:
      "Italian dessert made with sweetened cream that is thickened with gelatin and molded, often served with fruit or sauce.",
    cost: 9,
    rating: 4.4,
  },
  {
    name: "Fruit Tart",
    description:
      "Dessert pastry filled with sweet pastry cream and topped with fresh fruit, often glazed with apricot jam.",
    cost: 12,
    rating: 4.5,
  },
  {
    name: "Chocolate Mousse",
    description:
      "Light and airy dessert made with whipped chocolate ganache or melted chocolate folded into whipped cream or egg whites.",
    cost: 10,
    rating: 4.7,
  },
  {
    name: "Banoffee Pie",
    description:
      "British dessert pie made with bananas, toffee, and cream, often served on a biscuit or pastry base.",
    cost: 13,
    rating: 4.6,
  },
  {
    name: "Red Velvet Cake",
    description:
      "Moist cake with a hint of cocoa, often colored red and layered with cream cheese frosting.",
    cost: 11,
    rating: 4.5,
  },
  {
    name: "Cupcakes",
    description:
      "Individual-sized cakes baked in cupcake liners and topped with frosting, sprinkles, or other decorations.",
    cost: 8,
    rating: 4.6,
  },
  {
    name: "Baklava",
    description:
      "Sweet pastry made of layers of phyllo dough filled with chopped nuts and sweetened with honey or syrup.",
    cost: 14,
    rating: 4.7,
  },
  {
    name: "Lemon Bars",
    description:
      "Tangy dessert bars made with a shortbread crust and lemon curd filling, dusted with powdered sugar.",
    cost: 10,
    rating: 4.6,
  },
  {
    name: "Profiteroles",
    description:
      "French dessert consisting of small choux pastry balls filled with cream and typically drizzled with chocolate sauce.",
    cost: 12,
    rating: 4.5,
  },
  {
    name: "Molten Chocolate Cake",
    description:
      "Individual-sized chocolate cake with a gooey chocolate center, often served with vanilla ice cream.",
    cost: 13,
    rating: 4.8,
  },
  {
    name: "Strawberry Shortcake",
    description:
      "Dessert made with sweetened biscuits or sponge cake layered with whipped cream and sliced strawberries.",
    cost: 11,
    rating: 4.6,
  },
  {
    name: "Eclairs",
    description:
      "Long, thin pastries filled with pastry cream and topped with chocolate icing.",
    cost: 9,
    rating: 4.5,
  },
  {
    name: "Cheesecake",
    description:
      "Dessert consisting of a sweetened cream cheese mixture on a crust, often topped with fruit or sauce.",
    cost: 18,
    rating: 4.7,
  },
  {
    name: "Chocolate Fondue",
    description:
      "Dessert where pieces of fruit and other sweets are dipped into a melted chocolate mixture.",
    cost: 20,
    rating: 4.6,
  },
  {
    name: "Pavlova",
    description:
      "Dessert consisting of a meringue base topped with whipped cream and fresh fruit.",
    cost: 16,
    rating: 4.5,
  },
  {
    name: "Banoffee Pie",
    description:
      "Dessert pie made with bananas, toffee, and cream, often served with a crumbled biscuit crust.",
    cost: 22,
    rating: 4.8,
  },
  {
    name: "Tres Leches Cake",
    description:
      "Sponge cake soaked in three kinds of milk (evaporated milk, condensed milk, and heavy cream), topped with whipped cream.",
    cost: 18,
    rating: 4.7,
  },
  {
    name: "Baklava",
    description:
      "Sweet pastry made of layers of filo dough filled with chopped nuts and sweetened with syrup or honey.",
    cost: 15,
    rating: 4.6,
  },
  {
    name: "Creme Brulee",
    description:
      "French dessert consisting of a rich custard base topped with a layer of caramelized sugar.",
    cost: 20,
    rating: 4.7,
  },
  {
    name: "Apple Pie",
    description:
      "Classic American dessert made with a flaky pastry crust filled with spiced apples.",
    cost: 16,
    rating: 4.5,
  },
  {
    name: "Key Lime Pie",
    description:
      "Dessert pie made with key lime juice, egg yolks, and sweetened condensed milk in a pie crust.",
    cost: 14,
    rating: 4.6,
  },
  {
    name: "Chocolate Lava Cake",
    description:
      "Individual chocolate cake with a gooey, molten chocolate center, often served with ice cream.",
    cost: 18,
    rating: 4.8,
  },
  {
    name: "Red Velvet Cake",
    description:
      "Layer cake with a distinctive red color, typically frosted with cream cheese icing.",
    cost: 16,
    rating: 4.7,
  },
  {
    name: "Cannoli",
    description:
      "Italian pastry tube filled with sweetened ricotta cheese, often containing chocolate chips or candied fruit.",
    cost: 12,
    rating: 4.6,
  },
  {
    name: "Pumpkin Pie",
    description:
      "Traditional American pie made with spiced pumpkin custard filling baked in a pie crust.",
    cost: 14,
    rating: 4.5,
  },
  {
    name: "Strawberry Shortcake",
    description:
      "Dessert made with sweet biscuits or sponge cake layered with sliced strawberries and whipped cream.",
    cost: 16,
    rating: 4.6,
  },
  {
    name: "Raspberry Sorbet",
    description:
      "Frozen dessert made with sweetened water and raspberry puree, churned to a smooth consistency.",
    cost: 10,
    rating: 4.4,
  },
  {
    name: "Eclairs",
    description:
      "Long, thin pastry filled with cream and topped with chocolate icing.",
    cost: 12,
    rating: 4.5,
  },
  {
    name: "Bread Pudding",
    description:
      "Dessert made from stale bread, eggs, milk, sugar, and spices, often served with a sauce.",
    cost: 14,
    rating: 4.4,
  },
  {
    name: "Lemon Bars",
    description:
      "Dessert consisting of a lemon-flavored filling on a shortbread crust, often dusted with powdered sugar.",
    cost: 12,
    rating: 4.5,
  },
  {
    name: "Chocolate Chip Cookies",
    description:
      "Classic cookies made with chocolate chips and often nuts, with a soft and chewy texture.",
    cost: 10,
    rating: 4.6,
  },
  {
    name: "Pecan Pie",
    description:
      "Southern pie made with a filling of pecans, sugar, butter, and eggs, often served with whipped cream or ice cream.",
    cost: 16,
    rating: 4.7,
  },
  {
    name: "Carrot Cake",
    description:
      "Moist cake made with grated carrots, spices, and nuts, often frosted with cream cheese icing.",
    cost: 18,
    rating: 4.6,
  },
  {
    name: "Molten Chocolate Souffle",
    description:
      "Dessert made with a light and airy chocolate cake with a warm, gooey center.",
    cost: 20,
    rating: 4.8,
  },
  {
    name: "Coconut Macaroons",
    description:
      "Small, sweet cookies made from shredded coconut, often dipped in chocolate.",
    cost: 12,
    rating: 4.5,
  },
  {
    name: "Fruit Tart",
    description:
      "Dessert made with a pastry crust filled with sweet pastry cream and topped with fresh fruit.",
    cost: 16,
    rating: 4.6,
  },
  {
    name: "Biscotti",
    description:
      "Italian almond biscuits that are twice-baked, making them crisp and ideal for dipping in coffee or wine.",
    cost: 10,
    rating: 4.5,
  },
  {
    name: "Peach Cobbler",
    description:
      "Southern dessert made with sliced peaches baked with a sweet biscuit or cake topping.",
    cost: 14,
    rating: 4.6,
  },
  {
    name: "Chocolate Mousse",
    description:
      "Light and airy dessert made with whipped chocolate, eggs, and cream.",
    cost: 18,
    rating: 4.7,
  },
];

export default function handler(req, res) {
  res.status(200).json(dishes);
}
