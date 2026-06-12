//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

var version = "v1";


//router.post('/'+ version +'/investigator/start-request-for-info', function(request, response) {

	
		//response.redirect("add-providor")

//})
	
//router.post('/'+ version +'/investigator/add-benefit', function(request, response) {

	
		//response.redirect("add-providor")
	
//})

router.post('/'+ version +'/investigator/add-providor', function(request, response) {

	
		response.redirect("add-category")
	
})

router.post('/'+ version +'/investigator/add-category', function(request, response) {


	var categoryType = request.session.data['categoryType']
	if (categoryType == "Finance"){
		response.redirect ("add-subject-financial")
	} else {
		response.redirect("add-subject")
	}
})


router.post('/' + version + '/investigator/add-subject-financial', function(request, response) {

    var requestType = request.session.data['requestType']
    if (requestType == "Accounts and bank statements"){
        response.redirect("add-subject-financial-accounts")
    }
    else if (requestType == "Specific transaction details"){
        response.redirect("add-subject-financial-transaction")
    }
    else if (requestType == "Loans and mortgages"){
        response.redirect("add-subject-financial-loans")
    } 
    else {
        response.redirect("add-subject")
    }

})

router.post('/'+ version +'/investigator/add-subject-financial-accounts', function(request, response) {

	
		response.redirect("accounts-request")
	
})

router.post('/'+ version +'/investigator/accounts-request', function(request, response) {

	
		response.redirect("bank-account-request")
	
})

router.post('/'+ version +'/investigator/bank-account-request', function(request, response) {

	
		response.redirect("bank-account-request-2")
	
})

router.post('/'+ version +'/investigator/bank-account-request-2', function(request, response) {

	
		response.redirect("add-another-account")
	
})

//router.post('/'+ version +'/investigator/add-request', function(request, response) {

	
		//response.redirect("add-another-account")
	
//})

router.post('/'+ version +'/investigator/add-subject-financial-loans', function(request, response) {

	
		response.redirect("loan-request")
	
})

router.post('/'+ version +'/investigator/loan-request', function(request, response) {

	
		response.redirect("add-another-account")
	
})

router.post('/'+ version +'/investigator/add-subject-financial-transaction', function(request, response) {

	
		response.redirect("add-another-account")
	
})

//router.post('/'+ version +'/investigator/add-another-account', function(request, response) {

	
		//response.redirect("check-answers")
	
//})

router.post('/' + version + '/investigator/add-another-account', function(request, response) {

    var requestType = request.session.data['requestType']
    if (requestType == "Accounts and bank statements"){
        response.redirect("check-answers")
    }
    else if (requestType == "Specific transaction details"){
        response.redirect("check-answers-transaction")
    }
    else if (requestType == "Loans and mortgages"){
        response.redirect("check-answers-loan")
    } 
    else {
        response.redirect("add-subject")
    }

})

router.post('/'+ version +'/investigator/check-answers', function(request, response) {

	
		response.redirect("review-request")
	
})

router.post('/'+ version +'/investigator/review-request', function(request, response) {

	
		response.redirect("declaration")
	
})

router.post('/'+ version +'/investigator/declaration', function(request, response) {

	
		response.redirect("rfi-dashboard")
	
})

router.post('/'+ version +'/investigator/check-answers-transaction', function(request, response) {

	
		response.redirect("review-request-transaction")
	
})

router.post('/'+ version +'/investigator/check-answers-loan', function(request, response) {

	
		response.redirect("review-request-loan")
	
})

router.post('/'+ version +'/investigator/review-request-loan', function(request, response) {

	
		response.redirect("declaration")
	
})

router.post('/'+ version +'/investigator/review-request-transaction', function(request, response) {

	
		response.redirect("declaration")
	
})