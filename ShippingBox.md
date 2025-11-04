Title:-Shipping Box

Description: - This specification describes a tiny application for calculating the shipping cost for boxes to Specific locations worldwide from India. The application shall consist of two simple views, one table, and a form, a navbar component.

Functionality:-
View A - Form (Add box)
● Form containing four fields:
○ Receiver name (input text)
○ Weight (input number) in kilograms
○ Box colour (color picker component/text) returned in RGB format i.e. value becomes (255, 255, 255)
○ Destination country (dropdown / select list) of the following choices
(multipliers below):
■ Sweden (7.35 INR)
■ China (11.53 INR)
■ Brazil (15.63 INR)
■ Australia (50.09 INR)
○ save button to store values in the database

View B - Table (List of captured inputs)
● The table should contain 5 columns:
○ Receiver name
○ Weight in kilograms
○ Box colour (should be displayed as an actual colour box)
○ Destination Country
○ Calculated shipping cost in INR format.

Component A - Navbar (Contains two routes to switch between form and list/table view)

Things to handle:

1. The user shall be presented with some error message, indicating required fields, unless they all contain values when saving.
2. Likewise, suppose the user tries to insert a negative value as weight. In that case, the user shall be presented with an error message explaining that negative values are not permitted and the field shall default to zero.
3. The application should be responsive across the devices.
4. Load the environment configurations if any from the .env file.
5. The above-mentioned currencies cost per box. For Ex: if we want to ship from India to Sweden it costs around 7.35 INR (1 \* 7.35) per box. So while displaying the calculated shipping cost we should calculate the cost as per the respective countries' currency conversion per box.

Expected Outcome:-
● This task should be solved using some form of MVC-style design pattern, where presentation and business logic are somewhat separated.
● It should be a single-page application using state management techniques to store the data locally.
● Finally, with two endpoints —one for saving boxes and another one for retrieving the list.

Tech-Stack/Libraries to be used:
● ReactJs at the front end to build views and components.
● The concept of state management, props to be used to manage the state across the components.

Things to submit:
● GitHub Repo URL that contains the source code for the developed application.
● A hosted URL that contains a working application is a plus(Optional).

Note:
● Explain the steps to build the project in the readme file.
● The evaluation includes code quality, documentation, architecture, readability, etc...
