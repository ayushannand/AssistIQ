from flask import Flask, request, jsonify
from langchain.llms import LlamaCpp
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.prompts.prompt import PromptTemplate
from langchain.chains import LLMChain

app = Flask(__name__)

# Load the Vicuna model
callback_manager = CallbackManager([StreamingStdOutCallbackHandler()])
llm = LlamaCpp(
    temperature=0,
    model_path="../llms/wizard-vicuna-13B.ggmlv3.q5_1.bin",
    callback_manager=callback_manager,
    verbose=True,
    n_ctx=1024,
    n_gpu_layers=43,
    n_batch=512,
    max_token=128
)


# Define the prompt template
template = """You are an expert in answering questions about the JSON object. The object will contain he user's information. Here's is the JSON
{custObject}

Here are few shot examples
#Example 1 
Question - Show me the order date and amount of direct.ayush@gmail.com 
Response - {{Order date - 12/03/2002;\n Order Amount - 100USD}}
#Example 2
Question - Show me the order reference number of direct.ayush@gmail.com
Response - {{Error - Order reference number not found}}
#Example 3
Prompt - Show me the order date and order tracking id
Response - {{Order date - 12/03/2002;\n Error - Order tracking id not found}}

Based on the object, answer the following question
Question - {input}"""

prompt = PromptTemplate(
    input_variables=["input", "custObject"],
    template=template,
    # partial_variables={"format_instructions": "JSON"}
)

# Create the LLMChain instance
llm_chain = LLMChain(prompt=prompt, llm=llm, verbose=True)


# Define the API endpoint
@app.route('/answer', methods=['POST'])
def answer_question():
    question = request.json['question']
    customer = request.json['customer']
    
    output = llm_chain.run(input=question, custObject = customer)
    
    return jsonify({'answer': output})


if __name__ == '__main__':
    app.run()
