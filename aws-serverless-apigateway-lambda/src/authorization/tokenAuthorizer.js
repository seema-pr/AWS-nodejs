module.exports.handler = async (event) => {
    const token = event.headers.Authorization;
 
    let responseObj;

    if (token === 'user-allow') {
        const policy = generatePolicy('user', 'Allow', event.routeArn);
        console.log("policy ",policy)
        if (policy.error) {
            // Handle the error
            responseObj = {
                statusCode: 500,
                body: JSON.stringify({ message: policy.error }),
            };
        } else {
            responseObj = {
                statusCode: 200,
                body: JSON.stringify(policy, null, 2)
            };
        }
    } else if (token === 'user-deny') {
        const policy = generatePolicy('user', 'Deny', event.routeArn);
        if (policy.error) {
            // Handle the error
            responseObj = {
                statusCode: 500,
                body: JSON.stringify({ message: policy.error }),
            };
        } else {
            responseObj = {
                statusCode: 200,
                body: JSON.stringify(policy, null, 2)
            };
        }
    } else {
        responseObj = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'No Authorization header found'
            }, null, 2)
        };
    }

    return responseObj;
};


const generatePolicy = (principalId, effect, resource) => {
    //Check if effect and resource are provided
    if (!effect || !resource) {
        throw new Error('Effect and resource are required parameters for generating a policy.');
    }

    const policyDocument = {
        Version: '2012-10-17',
        Statement: [{
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: resource
        }]
    };

    const policy = {
        principalId: principalId,
        policyDocument: policyDocument
    };

    return policy;
};

