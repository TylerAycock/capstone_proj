# National Park Camping Reservations 

If you’ve ever tried to find and reserve a campsite using the National Park website, than you know that finding the perfect site for your upcoming trip can be a tricky process. 
This app sets out to create an easy to use interface for users to browse all available sites in the National Park system and to quickly make a reservation. 
The homepage pulls in all available sites from the main database which you can then add to your cart. Once you click "reserve" the app updates the database marking that spot unavailable and then adds that particular spot to your profile. 
Additionally users can filter a table that holds basic information about every National Park to view more details about the park they plan to visit. 

The Campsite Reservation app was created by Tyler Aycock who is a full-stack web developer.

## Table of Contents
* [Technologies Used](#technologiesused)
* [How to run this app locally](#run)
* [How to use this app](#use)

## <a name="technologiesused"></a>Technologies Used 
* HTML
* CSS
* JavaScript 
* Axios
* Sequelize
*(dependencies are listed in requirements.txt)

## <a name="run"></a>How to run this app locally
This app has not yet been deployed, so here is how to run the app locally on your machine.
* Initialize Node Package Manager (npm i - y) 
* Install all dependencies (npm i )
* In the ~ directory type nodemone in the terminal (starts the locally hosted project)
* The project is now running on http://localhost:4044/ 

## <a name="use"></a> How to use this app
* On the homepage you will see the populated list of available campsites 
* Click add to add a campsite to your shopping cart
* You will now see the reserve button show up in the upper left hand corner of the shopping cart
* Click reserve to confirm your reservation 
* All reservations will now show up on your profile which can be found under the reservations tap
* Cancle will remove that specific reservation adding it back to the list of available sites
* The national parks page allows you to filter through the parks database to see additional information about a park you're insterested in

## Author
Tyler Aycock is a full stack developer in San Diego, CA.