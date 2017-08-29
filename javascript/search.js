function __(id){
  return document.getElementById(id);
}


document.getElementById('name').onkeyup = function()
{

  var name = __("name").value;

  var preferences = {"name": name};
  var preferencesJSON = JSON.stringify(preferences);

  if(name.length > 2)
  {
    var url = "search";
    var http = new XMLHttpRequest();

    http.open("POST", url, true);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function () {

      console.log("working");
      if (http.readyState === 4 && http.status === 200)
      {

        console.log(http.responseText);

        if(http.responseText == "Contact your administrator" || http.responseText == "Not Found")
        {
          document.getElementById("display").innerHTML = http.responseText;
        }
        else {


          var rs = JSON.parse(http.responseText);
console.log(rs);
          var tb = [];
          if(rs.length > 0)
          {
            for (var i = 0; i < rs.length; i++) {

              var name = rs[i].debtors.name;
              var amount = rs[i].debtors.amount;
              var when = rs[i].debtors.when;
              var paid = rs[i].debtors.paid;
              var contact = rs[i].debtors.contact;
              var email = rs[i].debtors.email;
              var id = rs[i]._id;

              var tr = '<tr><td>'+name+'</td><td>'+amount+'</td><td>'+paid+'</td><td>'+when+'</td><td>'+contact+'</td><td>'+email+'</td><td><a href="/edit?id='+id+'">Edit</a></td></tr>';

              tb.push(tr);

            }

          }
          createTable(tb);
        }
      }
    }
    http.send(preferencesJSON);
    return false;

  }
};

function createTable(msg){

  console.log(msg);
  var tb ='<table><thead><tr><th>Name</th><th>Amount (£)</th><th>Paid</th><th>Expected Pay Date</th><th>Contact</th><th>Email</th></tr></thead><tbody>';
  var tbend = '</tbody></table>';

  for (var i = 0; i < msg.length; i++) {
    tb = tb + msg[i];
  }

  var msgr = tb+tbend;
  document.getElementById("display").innerHTML = msgr;
}
