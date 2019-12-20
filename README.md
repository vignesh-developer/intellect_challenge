# intellect_challenge

<h2>Install Dependencies</h2>
<p>Once you clone the project do install all the dependencies by running this in your cmd<p>
<pre>$ npm install</pre>
<p>You should have <b>MongoDB</b> and <b>Postman</b> installed in your system<p>

<h2>To Run</h2>
<p>Start Node server with the following cmd<p>
<pre>$ npm run dev</pre>
<p>Also start MongoDB server<p>

<h2>API Specifications</h2>
<p> * Each field except timestap is mandatory * </p>
<p> The JSON for creating new records should be in the following format (in postman) </p>
<pre>
{
    "id": "Your id",
    "type": "Your type",
    "user": {
        "id": "Your user id",
        "name": "Your user name"
    },
    "symbol": "Your symbol",
    "shares": "Your shares",
    "price": Your price
}
The timestamp will be recorded by default corresponding to the current date and time
</pre>
<p> For filtering through date, the format should be <pre>yyyy/mm/dd</pre> </p>
<p> You can use postman to test the APIs </p>

<h2>Supported Datatypes</h2>
<p> id : String </p>
<p> type : String </p>
<p> user id : String </p>
<p> symbol : String </p>
<p> shares: String </p>
<p> price : Number </p>
