const customers = [
  {
    id: 1,
    firstName: "Rahul",
    lastName: "Sharma",
    email: "rahul.sharma@example.com",
    address: {
      street: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
    },
    phone: "+91 9876543210",
    orders: [
      {
        orderId: "ORD123",
        products: [
          { productId: "P1", name: "Product 1", quantity: 2, price: 25.99 },
          { productId: "P2", name: "Product 2", quantity: 1, price: 19.99 },
        ],
        orderDate: "2023-09-08",
        total: 71.97,
      },
      {
        orderId: "ORD124",
        products: [
          { productId: "P3", name: "Product 3", quantity: 3, price: 14.49 },
        ],
        orderDate: "2023-09-05",
        total: 43.47,
      },
    ],
  },
  {
    id: 2,
    firstName: "Priya",
    lastName: "Patel",
    email: "priya.patel@example.com",
    address: {
      street: "456 Elm Street",
      city: "Delhi",
      state: "Delhi",
      postalCode: "110001",
    },
    phone: "+91 9876543211",
    orders: [
      {
        orderId: "ORD125",
        products: [
          { productId: "P4", name: "Product 4", quantity: 1, price: 34.99 },
        ],
        orderDate: "2023-09-07",
        total: 34.99,
      },
    ],
  },
  // Add more customer objects here...
];

export default customers;
