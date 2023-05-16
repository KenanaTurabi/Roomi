$(".form")
  .find("input, textarea")
  .on("keyup blur focus", function (e) {
    var $this = $(this),
      label = $this.prev("label");

    if (e.type === "keyup") {
      if ($this.val() === "") {
        label.removeClass("active highlight");
      } else {
        label.addClass("active highlight");
      }
    } else if (e.type === "blur") {
      if ($this.val() === "") {
        label.removeClass("active highlight");
      } else {
        label.removeClass("highlight");
      }
    } else if (e.type === "focus") {
      if ($this.val() === "") {
        label.removeClass("highlight");
      } else if ($this.val() !== "") {
        label.addClass("highlight");
      }
    }
  });

$(".tab a").on("click", function (e) {
  e.preventDefault();

  $(this).parent().addClass("active");
  $(this).parent().siblings().removeClass("active");

  target = $(this).attr("href");

  $(".tab-content > div").not(target).hide();

  $(target).fadeIn(600);
});

// const onSignUpPressed = () =>{
// document.location.reload();
// window.location.href="ViewHostel.html";

//   }

const onSignUpPressed = () => {
  console.log("hello");
  const username = document.getElementById("UserName").value;
  const email = document.getElementById("Email").value;
  const password = document.getElementById("Password").value;
  const mobileNumber = document.getElementById("phone").value;
  const city = document.getElementById("city").value;

  const studentRadio = document.getElementById("studentRadio");
  const investorRadio = document.getElementById("investorRadio");
  var role;
  if (investorRadio.checked) {
    role = investorRadio.value;
  } else if (studentRadio.checked) {
    role = studentRadio.value;
  } else {
    console.log("Please select a role");
  }

  const params = {
    username: username,
    email: email,
    mobileNumber: mobileNumber,
    password: password,
    role: role,
    city:city,
  };

  console.log(params);

  fetch("https://roomi.azurewebsites.net/user/signup", {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => document.location.reload());

  window.location.href = "SignIn.html";
};
