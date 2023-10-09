import { useSelector } from "react-redux";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { getCart } from "../cart/CartSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const username = useSelector((state) => state.user.username);

  const navigation = useNavigation();
  // console.log(navigation);
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();

  // const [withPriority, setWithPriority] = useState(false);
  // const cart = fakeCart;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST" action="">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            {/* If any element not inside FLEX CONTAINER then we can use width/Height else we need to use flex basis */}
            <input className="input w-full" type="tel" name="phone" required />

            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring 
            focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        {/* Example cart that going to submitted */}
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />

        <div>
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? "Placing Order.." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// This function mainly getting the FORM DATA
// So for form using action, needs to convert to JSON.stringify if contains complex data such as array, objects,...
export async function action({ request }) {
  // 1. When we submit the form, form will be submitted as formData
  const formData = await request.formData();
  // GEt the data from formData usng special function
  const data = Object.fromEntries(formData);
  // console.log(data);

  // Before Submitting the Form, WE need to convert JSON string to normal Javascript Object
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on", // Convert to boolean, if priority is 0 Then store as true
  };

  // console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please give is correct phone number";

  if (Object.keys(errors).length > 0) return errors;

  // On the POST API, we can convert the normal JAVASCRIPT to JSON.stringify to store into the API server
  // If everything is okay, create new order and redirect

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
