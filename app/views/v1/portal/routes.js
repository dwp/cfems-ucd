//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

var version = "v1";


router.post('/'+ version +'/portal/enter-ref', function(request, response) {

	
		response.redirect("confirm-who-you-are")
	
})

router.post('/'+ version +'/portal/confirm-who-you-are', function(request, response) {

	
		response.redirect("upload-files")
	
})

router.post('/'+ version +'/portal/confirm-subject-name', function(request, response) {

	
		response.redirect("upload-files")
	
})

router.post('/'+ version +'/portal/upload-files', function(request, response) {

	
		response.redirect("uploaded-files")
	
})

router.post('/'+ version +'/portal/uploaded-files', function(request, response) {

	
		response.redirect("confirmation")
	
})





