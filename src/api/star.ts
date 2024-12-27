import api from '@/utils/axios';

export const star = (repoAuth: string, repoName: string, sourceUserId: string, targetUserId: string) => {
    console.log('star');
    return api.post('/star?repoAuth='
        + repoAuth
        + '&repoName=' + repoName
        + '&sourceUserId=' + sourceUserId
        + '&targetUserId=' + targetUserId
    ).catch(error => {
        console.error('Star API error:', error);
    })
}
