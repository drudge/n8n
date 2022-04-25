import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
} from 'n8n-workflow';

import {
	apiRequest,
	apiRequestAllItems,
} from '../../../transport';

export async function members(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const channelId = this.getNodeParameter('channelId', index) as string;
	const returnAll = this.getNodeParameter('returnAll', index) as boolean;
	const resolveData = this.getNodeParameter('resolveData', index) as boolean;
	const limit = this.getNodeParameter('limit', index, 0) as number;
	
	const body = {} as IDataObject;
	const qs = {} as IDataObject;
	const requestMethod = 'GET';
	const endpoint = `channels/${channelId}/members`;

	if (returnAll === false) {
		qs.per_page = this.getNodeParameter('limit', index) as number;
	}

	let responseData;

	if (returnAll) {
		responseData = await apiRequestAllItems.call(this, requestMethod, endpoint, body, qs);
	} else {
		responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);
		if (limit) {
			responseData = responseData.slice(0, limit);
		}
		if (resolveData) {
			const userIds: string[] = [];
			for (const data of responseData) {
				userIds.push(data.user_id);
			}
			if (userIds.length > 0) {
				responseData = await apiRequest.call(this, 'POST', 'users/ids', userIds, qs);
			}
		}
	}

	return this.helpers.returnJsonArray(responseData);
}