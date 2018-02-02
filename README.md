# Drone Mission Analysis

## Background: 
Drones are opening up entirely new paradigms for commercial businesses. These flying robots are quickly stepping in to do jobs that are dull, dirty and dangerous. The age of robotics is here, and today is like Internet 1995.In many applications a drone can do a better job than a human, and one of those is infrastructure inspection. Being new technology, there are no standards in place and the results of these inspections can vary depending on the skill and experience of the drone operator.


## Project Specifics: 
Commercial drone operators can contract the company and download pre-program inspection missions then visit the inspection site and fly the mission. After the mission is complete, the operator needs to send back data to mobile application to double check that the inspection is complete. The application needs a way to extract data from the images taken during the inspection and send it back to their cloud service for verification. The data that needs to be extracted from the pictures are standard EXIF data, XMP (DJI Metadata) and a thumbnail of each image.



** **

## 1.   Vision and Goals Of The Project:

To automate the process of  mission status checking of  flying  drones. Create a mobile based application to be an interface for communication between the Cloud and the drone. 

** **

## 2. Users/Personas Of The Project:

The end user of this project would be commercial drone operators or employees authorized to handle drones. The role of the end user is to download the mission plan from the mobile application and transfer it to the drone. Also to  monitor the drone while it completes the mission and transfer the images captured by the drone while on mission to the mobile from the SD card. And to upload the images to the mobile app for further processing. Once the processing is complete to download a new set of instructions for the drone.

** **

## 3.   Scope and Features Of The Project:

#### Mobile Application:
 
 - Provides a simple, low bandwidth supported yet compelling web-based interface for end-users (Drone Operators).
 - Authentication mechanism to access the system (to download mission plans, upload drone downloaded images to check whether mission is complete or not)
 - Allows authenticated users to download their mission plans.
 - Extract metadata like XMP, EXIF and Thumbnails from the drone-taken images for analysis.
 - Upload the meta data to a custom cloud service (back end logic) for validation against the mission plan (can do client-side processing also, open ended?)
 - Provide a result as either ‘Mission Complete’ or an instruction to re-fly all or part of the mission.
 - Throughout the process, provides a visualization of the mission status (nice to have)

#### What will not be covered:

Drone related operations like:
 - Creation of mission plan.
 - Uploading of mission plan from mobile to the drone.
 - Downloading of images from the drone to the mobile device.

** **

## 4. Solution Concept

#### Amazon EC2: 
Amazon elastic cloud service will be used to host the mobile application. It will act as an interface for communication between the user and the cloud services like Cognito, S3, Lambda.

#### Amazon Cognito: 
To authenticate users accessing the cloud service. A token generated for the authenticated users will be passed via subsequent requests to the various cloud services.

#### Amazon S3: 
To store the mission plans. S3 will act as an object base store for the mission plans. 

#### Amazon Lambda: 
To compute the comparison algorithm and determine status of the mission.

#### Mobile Application:  
The mobile app will be built in react-native due to its compatibility with android and ios and strong performance on mobile environments.Also additionally, npm modules will be used for image metadata extraction and processing.  

 ![Global Architectural Structure Of the Project:](https://github.com/BU-NU-CLOUD-SP18/Drone-Mission-Analysis/blob/master/DMA-Architecture.jpeg)

## Design Implications and Discussion:

#### Amazon Web Service: 
Provides us with all the web services we need for creating this application which includes storage, authentication and computation. This service is prefered by the client. Allows us to be extensible, Scalable and maintainable.

#### Amazon EC2: 
This service will act as a server to host the mobile application. Provides us with different options to scale up/down various resources as per our needs.

#### Amazon Cognito: 
Since only the authorized user should be able to access the mission plans, we need amazon’s cognito service for authentication. This service provides us with a sophisticated authentication mechanism using JWT(JSON) web tokens. This service will also allow us to create user roles so as to segregate various features of the application amongst them.

#### Amazon S3: 
Low cost object based storage of mission plans which will be in csv format. Can segregate user specific access to the files if required by the application in future. Integrates well with other AWS technologies.

#### Amazon Lambda: 
This service is currently intended to be used for running the comparison algorithm and determine the mission status. Provides us with a serverless architecture to do the computations. Can be scaled to perform future possible computations related to the application.
 
#### Mobile Application: 
People on-site flying the drones will have easy access to the cloud service using the mobile application to download the mission plan. React Native is platform independent, has multiple npm libraries for image metadata processing.

** **

## 5. Challenges

Extracting data exif and .xmp data  from the images uploaded to the application
Determining an efficient algorithm for comparison of the extracted data from image and data from the plan as not all  data from the image is clearly understood and determining clever error margins based on data discrepancy.

** **

## 6. Acceptance criteria

 - The mobile device gets a mission plan from the cloud
 - After the mission is flown the application reads the image data from the SD card
 - The mobile devices uploads the image metadata to the cloud for analysis
 - The mobile application will display the status of the mission after the analysis is complete.

#### Nice to have
 - Pictorial visualization of mission status
 - Report generation of the data comparison.
 - Registering a new user and creating login credentials for the user on mobile app.
 - Functionality of uploading a new mission plan to the cloud application using a web interface. 


## 7.  Release Planning:

Incremental feature progression of the project.

### Iteration 1 :
	1) Gathering the requirements
	2) Deciding the technologies to be used
	3) Project proposal documentation
	4) Role assignment
	5) Learning curves for React-native, Image processing and metadata understanding  and AWS technology
	
### Iteration 2 :
	1) Researching efficient ways of extracting image metadata
	2) Setting up the AWS backend services
	3) Brainstorming comparison algorithm.
	4) Learning curves for React-native, Image processing and metadata understanding  and AWS technology

#### Features to be delivered - 
	1) UI mock-ups for the mobile application
	2) Application architecture

### Iteration 3:
	1) Pseudo code for the comparison algorithm

#### Features to be delivered:
	1) UI wireframes for mobile application in react-native
	2) Extracting data from the image using npm module
	3) Login functionality

### Iteration 4:
	1) Implementing the comparison algorithm

#### Features to be delivered:
	1) Plan download functionality
	2) Multiple Image upload functionality

### Iteration 5:
	1) Dry run of the comparison algorithm
	2) Rigours system testing
	3) Application handover

#### Features to be delivered:
	- Mission status generation functionality






