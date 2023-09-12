# AssistIQ - Vicuna Setup

## Installation and Setup

1. Create a folder named "gpt" on your local disk (usually C: drive).

2. Download Vicuna from [Hugging Face](https://huggingface.co/TheBloke?sort_models=downloads#models) and place it inside the "llms" folder within the "gpt" folder.

3. Download Python 3.10 from [Python.org](https://www.python.org/downloads/) and install it on your system.

4. Create a virtual environment for Python and the Large Language Models (LLMs) in the "gpt" folder:
   ```
   cd C:\gpt
   python -m venv venv
   ```

5. Install Visual Studio and C++ components to support Llama.

6. Paste the Flask app inside the "gpt" folder. Note: Make sure to change the path of the LLM as per your system path in the app.

## Running the Flask App

1. Open the command prompt in the "gpt" folder.

2. Activate the virtual environment:
   ```
   cd venv\Scripts
   activate
   ```

3. Go back to the "gpt" folder:
   ```
   cd ..\..
   ```

4. Run the Flask app by executing the following command:
   ```
   python app.py
   ```

5. Access the Flask app by visiting http://localhost:5000 in your web browser.

## Documentation for Flask App

For detailed documentation on how to use the Flask app, please refer to [python-app.md](./python-app.md).

We hope you have a seamless experience with AssistIQ - the intelligent virtual assistant that revolutionizes data interactions.