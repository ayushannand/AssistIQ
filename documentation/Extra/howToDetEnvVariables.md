## OpenAI API Key Retrieval

To access OpenAI's API, you need to obtain an API token for authentication. Follow these steps to get your API token:

Step 1: Sign up for an account
If you don't already have an account on OpenAI's platform, you need to sign up for one. Go to the OpenAI website (https://openai.com) and create an account using your email address.

Step 2: Log in to your OpenAI account
After signing up, log in to your OpenAI account using your credentials.

Step 3: Navigate to the API settings
Once you are logged in, navigate to the API settings page. You can typically find this in the account dashboard or settings section.

Step 4: Generate an API token
On the API settings page, look for an option to generate an API token or access token. Click on the button or link to generate the token. The token will be a long alphanumeric string that serves as your authentication key for making API requests.

Step 5: Paste the token in .env.local file
With the API token generated, you can now use it in your API requests. To keep the token secure, it is recommended to store it in a secure environment file like `.env.local`. Create or modify the `.env.local` file in your project's root directory and add the following line:

```
OPENAI_API_KEY=YOUR_API_TOKEN_HERE
```

Replace `YOUR_API_TOKEN_HERE` with the API token you generated. Make sure not to share this token with others, as it grants access to your OpenAI account.
