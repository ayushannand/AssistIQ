export function parsePrompt(prompt) {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
    // const phoneRegex = /\b\d{10}\b/;
    // const guidRegex = /\b[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+\b/;
  
    const emailMatch = prompt.match(emailRegex);
    // const phoneMatch = prompt.match(phoneRegex);
    // const guidMatch = prompt.match(guidRegex);
  
    if (emailMatch) {
      return {
        val: emailMatch[0],
        type: 'email',
      };
    } 
    // else if (phoneMatch) {
    //   return {
    //     identifier: phoneMatch[0],
    //     type: 'phone',
    //   };
    // } else if (guidMatch) {
    //   return {
    //     identifier: guidMatch[0],
    //     type: 'guid',
    //   };
    // } 
    else {
      return null;
    }
  }
  