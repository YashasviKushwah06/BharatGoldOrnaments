const questions = [
    {
      question: "What is the occasion for this jewellery?",
      note: "This helps us tailor our recommendations to match the significance and style suitable for the event.",
      options: ["Engagement", "Anniversary", "Birthday", "Daily-wear"],
      type: "select",
      hasCustomInput: true
    },
    {
      question: "Is this a gift or a personal purchase?",
      note: "Understanding if the jewellery is for yourself or someone else helps us refine our suggestions based on typical gift preferences.",
      options: ["Gift", "Personal Purchase"],
      type: "select"
    },
    {
      question: "Please select the gender.",
      note: "This allows us to recommend designs and styles that align with the typical preferences of the chosen gender.",
      options: ["Male", "Female", "Other"],
      type: "select"
    },
    {
      question: "What is the age group of the wearer?",
      note: "Age can significantly influence jewellery style preferences, so this helps us make more suitable recommendations.",
      options: ["<18", "18-25", "26-35", "36-50", "51+"],
      type: "radio"
    },
    {
      question: "Do you have any religious considerations for this jewellery?",
      note: "Some religious beliefs might influence jewellery design choices, like specific symbols or restrictions.",
      options: ["Christianity", "Islam", "Hinduism", "None"],
      type: "select"
    },
    {
      question: "What type of jewellery are you interested in?",
      note: "This helps us narrow down the product category to provide more relevant recommendations.",
      options: ["Rings", "Necklaces", "Pendants", "Bracelets", "Earrings"],
      type: "select"
    },
    {
      question: "What is your budget for this jewellery?",
      note: "Knowing your budget helps us suggest options that fit within your financial constraints.",
      options: ["<$50", "$50-$100", "$100-$200", "$200+"],
      type: "radio"
    },
    {
      question: "Would you like to match your jewellery with an outfit?",
      note: "Uploading an image of your outfit can help us recommend jewellery that complements your attire perfectly.",
      options: ["Yes", "No"],
      type: "radio",
      additional: true
    }
  ];
  
  let currentQuestion = 0;
  
  document.addEventListener("DOMContentLoaded", () => {
    showQuestion(currentQuestion);
    document.getElementById("submitBtn").style.display = "none";
  });
  
  function showQuestion(n) {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "";
    const q = questions[n];
    
    const questionElem = document.createElement("div");
    questionElem.className = "question";
  
    const label = document.createElement("label");
    label.innerText = q.question;
  
    const helpIcon = document.createElement("span");
    helpIcon.className = "help-icon";
    helpIcon.innerText = " ℹ️";
    
    const note = document.createElement("span");
    note.className = "note";
    note.innerText = q.note;
    
    helpIcon.appendChild(note);
    label.appendChild(helpIcon);
    questionElem.appendChild(label);
  
    if (q.type === "select") {
      const select = document.createElement("select");
      select.name = `question-${n}`;
      q.options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.text = option;
        select.add(opt);
      });
  
      if (q.hasCustomInput) {
        const customInput = document.createElement("input");
        customInput.type = "text";
        customInput.name = `custom-input-${n}`;
        customInput.placeholder = "Enter custom input";
        questionElem.appendChild(customInput);
      }
  
      questionElem.appendChild(select);
    } else if (q.type === "radio") {
      const radioOptionsDiv = document.createElement("div");
      radioOptionsDiv.className = "radio-options";
      radioOptionsDiv.style.marginTop = "15px"; // Add margin-top style for spacing
  
      q.options.forEach(option => {
        const div = document.createElement("div");
        div.style.marginBottom = "10px"; // Add margin-bottom style for spacing between radio buttons
  
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `question-${n}`;
        input.value = option;
        input.id = `option-${option}`;
        
        const label = document.createElement("label");
        label.htmlFor = `option-${option}`;
        label.innerText = option;
        
        div.appendChild(input);
        div.appendChild(label);
        radioOptionsDiv.appendChild(div);
      });
  
      questionElem.appendChild(radioOptionsDiv);
    }
  
    if (q.additional) {
      const fileUploadDiv = document.createElement("div");
      fileUploadDiv.className = "file-upload hidden";
      const fileUploadLabel = document.createElement("label");
      fileUploadLabel.htmlFor = "outfit-upload";
      fileUploadLabel.innerText = "Upload an image of your outfit for better recommendations.";
      const fileUploadInput = document.createElement("input");
      fileUploadInput.type = "file";
      fileUploadInput.id = "outfit-upload";
      fileUploadInput.name = "outfit-upload";
      
      fileUploadInput.addEventListener("change", previewFile);
  
      fileUploadDiv.appendChild(fileUploadLabel);
      fileUploadDiv.appendChild(fileUploadInput);
      questionElem.appendChild(fileUploadDiv);
  
      questionElem.addEventListener("change", (e) => {
        if (e.target.value === "Yes") {
          fileUploadDiv.classList.remove("hidden");
        } else {
          fileUploadDiv.classList.add("hidden");
        }
      });
    }
  
    questionContainer.appendChild(questionElem);
  
    if (n === questions.length - 1) {
      document.getElementById("nextBtn").style.display = "none";
      document.getElementById("submitBtn").style.display = "inline";
    } else {
      document.getElementById("nextBtn").style.display = "inline";
      document.getElementById("submitBtn").style.display = "none";
    }
  
    if (n === 0) {
      document.getElementById("prevBtn").style.display = "none";
    } else {
      document.getElementById("prevBtn").style.display = "inline";
    }
  }
  
  
  function changeQuestion(n) {
    const questionContainer = document.getElementById("question-container");
    const inputs = questionContainer.querySelectorAll("input, select");
    
    inputs.forEach(input => {
      if (input.type === "radio" && input.checked) {
        questions[currentQuestion].answer = input.value;
      } else if (input.tagName === "SELECT") {
        questions[currentQuestion].answer = input.value;
      } else if (input.type === "text") {
        questions[currentQuestion].customInput = input.value;
      }
    });
  
    currentQuestion += n;
    showQuestion(currentQuestion);
  }
  
  function previewFile() {
    const preview = document.getElementById("file-preview");
    const file = document.getElementById("outfit-upload").files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      preview.src = reader.result;
      preview.style.display = "block";
    }
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
      preview.style.display = "none";
    }
  }
  
  document.getElementById("customization-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const answers = questions.map(q => ({
      question: q.question,
      answer: q.answer,
      customInput: q.customInput
    }));
    alert(`Form submitted with answers: ${JSON.stringify(answers)}`);
  });
  