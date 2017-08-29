console.log(getTest)

function __(id){
  return document.getElementById(id);
}

if(getTest != "null")
{
  __("name").value = getTest.debtors.name,
  __("amount").value = getTest.debtors.amount,
  __("paid").value = getTest.debtors.paid,
  __("when").value = getTest.debtors.when;
  __("email").value = getTest.debtors.email,
  __("num").value = getTest.debtors.contact;


document.getElementById('buv').onclick = function()
{
  var name = __("name").value,
  amount = __("amount").value,
  paid = __("paid").value,
  conct = __("num").value,
  email = __("email").value,
  when = __("when").value;

  var preferences = {"id":getTest._id,"name": name, "amount": amount,"paid":paid, "when":when,"email":email,"conct":conct};
  var preferencesJSON = JSON.stringify(preferences);

  var url = "save";
  var http = new XMLHttpRequest();

  http.open("POST", url, true);
  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/json");

  http.onreadystatechange = function () {
    if (http.readyState === 4 && http.status === 200) {
      console.log(http.responseText);

      document.getElementById("alert").style.display = "block";
      __("alert").innerHTML = http.responseText;
      setInterval(removeAlert, 9000); //1000 = 1 seconds

      if(http.responseText == "changed")
      {

      }

      //const reply = JSON.parse(http.responseText);
      //console.log(reply.error);
    }};

    http.send(preferencesJSON);
    return false;

  };


}
else {
  console.log("Cannot find this person")
}


function removeAlert() {
  document.getElementById("alert").style.display = "none";
}
