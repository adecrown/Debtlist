function __(id){
  return document.getElementById(id);
}




__("when").value = "no";

document.getElementById('buv').onclick = function()
{
  var inputForm = document.getElementsByTagName('input');
  var count = 6;
  for (var i = 0; i < inputForm.length; i++) {

    //console.log(inputForm[i].type);
    if(inputForm[i].type != "button"){

      if(inputForm[i].value == ""){
        disp(inputForm[i].id + " cannot be empty.");
      }
      else {
        count = count - 1;
      }


    }

  }

  if (count == 0) {
    saveData();
  }
  else {
    disp("Please fill in the form properly.");
  }

}






function disp(data) {
  document.getElementById("alert").style.display = "block";
  __("alert").innerHTML = data;
  setInterval(removeAlert, 9000); //1000 = 1 seconds
}


function saveData()
{
  var name = __("name").value,
  amount = __("amount").value,
  paid = __("paid").value,
  conct = __("num").value,
  email = __("email").value,
  when = __("when").value;

  var preferences = {"name": name, "amount": amount,"paid":paid, "when":when,"email":email,"conct":conct};
  var preferencesJSON = JSON.stringify(preferences);

  var url = "createD";
  var http = new XMLHttpRequest();

  http.open("POST", url, true);
  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/json");

  http.onreadystatechange = function () {
    if (http.readyState === 4 && http.status === 200) {
      console.log(http.responseText);
      disp(http.responseText);

      if(http.responseText == "Added")
      {
        __("name").value = "",
        __("amount").value = "",
        __("paid").value = "",
        __("when").value = "";
        __("email").value = "",
        __("num").value = "";
      }

      //const reply = JSON.parse(http.responseText);
      //console.log(reply.error);
    }};

    http.send(preferencesJSON);
    return false;

  }



  function removeAlert() {
    document.getElementById("alert").style.display = "none";
  }


  document.getElementById('buv2').onclick = function(){


    var preferences = {"ago": nDate("ago"), "today": nDate("")};
    var preferencesJSON = JSON.stringify(preferences);

    var url = "fundD";
    var http = new XMLHttpRequest();

    http.open("POST", url, true);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function () {
      if (http.readyState === 4 && http.status === 200) {
        console.log(http.responseText);

        var rs = JSON.parse(http.responseText);

        var tb = [];
        for (var i = 0; i < rs.length; i++) {

          var name = rs[i].debtors.name;
          var amount = rs[i].debtors.amount;
          var when = rs[i].debtors.when;

          var tr = '<tr><td>'+name+'</td><td>'+amount+'</td><td>'+when+'</td></tr>';

          tb.push(tr);
        }


        sendAlert(tb)

        //const reply = JSON.parse(http.responseText);
        //console.log(reply.error);
      }}

      http.send(preferencesJSON);
      return false;

    };




    function sendAlert(msg)
    {

      var tb = '<table> <tr> <th>Name</th><th>Amount</th><th>When</th></tr>';
      var tbend = '</table>';

      var sub = "";


      for (var i = 0; i < msg.length; i++) {
        tb = tb + msg[i];
      }

      document.getElementById("du").innerHTML = tb+tbend;

      var msgr = tb+tbend;


      var preferences = {"subject": sub, "message": msgr};
      var preferencesJSON = JSON.stringify(preferences);

      var url = "sendingMail";
      var http = new XMLHttpRequest();

      http.open("POST", url, true);
      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/json");

      http.onreadystatechange = function ()
      {
        if (http.readyState === 4 && http.status === 200) {
          console.log(http.responseText);
        }
      }

      http.send(preferencesJSON);
      return false;

    }




    function nDate(w){
      var today = new Date();
      if (w=="ago") {
        var x = 5; // go back 5 days!
        today.setDate(today.getDate() + x);

      }

      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) {
        dd = '0'+dd
      }

      if(mm<10) {
        mm = '0'+mm
      }
      today = yyyy + '-' + mm + '-' + dd
      //today = mm + '/' + dd + '/' + yyyy;
      return today;
    }
