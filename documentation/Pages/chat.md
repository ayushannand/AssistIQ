## ChatPage Component Documentation

The `ChatPage` component is a React functional component that provides a user interface for interacting with an Intelligent Virtual Assistant called AIVA. Users can input prompts or questions, and AIVA responds with answers based on the provided prompt and information about a customer identified by an email address. The component uses various UI elements, styles, and API calls to achieve this functionality.

### Usage

To use the `ChatPage` component in your React application, follow these steps:

1. Import the `ChatPage` component into your desired file.

```javascript
import ChatPage from "./ChatPage";
```

2. Render the `ChatPage` component in your parent component.

```javascript
function App() {
  return (
    <div>
      {/* Other components */}
      <ChatPage />
    </div>
  );
}
```

### Component State

The `ChatPage` component manages the following states using the `useState` hook:

- `chatLog`: An array that stores the conversation log between the user and the assistant. Each message in the log is represented as an object with the properties `role` (either 'user' or 'assistant') and `content` (the text of the message).

- `isLoading`: A boolean state that is set to `true` while waiting for the assistant's response and set to `false` after the response is received.

- `inputValue`: Holds the value of the input field where the user enters prompts or questions.

- `identifier`: Represents the customer identifier, which is initially set to `null` and updated when the user enters an email address as the identifier.

### Methods

The `ChatPage` component defines the following methods:

- `handleInputChange`: This method is triggered whenever the user types into the input field. It updates the `inputValue` state with the entered value.

- `handleEmailChange`: This method is called when the user enters an email address. It sets the `identifier` state to the entered email, and the assistant responds with a message confirming the change.

- `handleChatSubmit`: This method is called when the user submits the prompt or question. It triggers the conversation with AIVA, fetches the customer data based on the entered email, and sends the prompt to the AIVA API for processing. The assistant's response is appended to the `chatLog`.

- `handleResetClick`: This method is called when the user clicks on the reset button. It prompts the user with a confirmation and reloads the page if confirmed, resetting the conversation.

### UI Components and Styles

The `ChatPage` component consists of the following UI elements and styles:

- An input field for the user to enter prompts or questions.
- A "Send" button to submit the input and trigger the conversation with AIVA. It displays a loading indicator while waiting for the response.
- A "Reset" button to clear the conversation log and reset the chat. It provides a confirmation dialog before resetting the conversation.
- Chat log display that shows the conversation between the user and AIVA. Messages are displayed in a card-based layout, where user messages are displayed in an `InputCard` component, and assistant responses are displayed in an `OutputCard` component.

### Note

- The component uses various MUI (Material-UI) icons and styles to enhance the user interface. Ensure that the required MUI components and styles are imported and available in your application.

- The component relies on the `getCombinedData` function from the `apiWrapper.js` module to fetch customer data based on the email identifier. Make sure this function is implemented correctly and accessible in your application.

- The AIVA interaction functionality is dependent on an AIVA API, which is not included in this code snippet. Ensure that the API endpoint for the AIVA service is correctly set up and that the assistant responds correctly based on the user's input.