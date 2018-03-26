import {get, post, ajax, resolve } from '../ajax'
import { config } from '../config'

const actions = {
    register_center({ commit, state, rootState }, param) {
        let params = {
            url: 'registry-center/list',
            data: param || {},
            base_url: config.worksys
        }
        return get(params).then((resp) => {
            return resolve(resp);
        });
    },
    register_center_connect({ commit, state, rootState }, param) {
        let params = {
            url: 'registry-center/connect',
            data: param || {},
            base_url: config.worksys
        }
        return ajax(params).then((resp) => {
            return resolve(resp);
        });
    },
    register_center_delete({ commit, state, rootState }, param) {
        let params = {
            url: 'registry-center/delete',
            data: param || {},
            base_url: config.worksys
        }
        return ajax(params).then((resp) => {
            return resolve(resp);
        });
    },
    register_center_add({ commit, state, rootState }, param) {
        let params = {
            url: 'registry-center/add',
            data: param || {},
            base_url: config.worksys
        }
        return ajax(params).then((resp) => {
            return resolve(resp);
        });
    },

    datasource_list({ commit, state, rootState }, param) {
        let params = {
            url: 'data-source/list',
            data: param || {},
            base_url: config.worksys
        }
        return get(params).then((resp) => {
            return resolve(resp);
        });
    },
    datasource_connect({ commit, state, rootState }, param) {
        let params = {
            url: 'data-source/connect',
            data: param || {},
            base_url: config.worksys
        }
        return ajax(params).then((resp) => {
            return resolve(resp);
        });
    },
    datasource_delete({ commit, state, rootState }, param) {
        let params = {
            url: 'data-source/delete',
            data: param || {},
            base_url: config.worksys
        }
        return ajax(params).then((resp) => {
            return resolve(resp);
        });
    },
    datasource_add({ commit, state, rootState }, param) {
        let params = {
            url: 'data-source/add',
            data: param || {},
            base_url: config.worksys
        }
        return ajax(params).then((resp) => {
            return resolve(resp);
        });
    },
    datasource_setDefault({ commit, state, rootState }, param) {
        let params = {
            url: 'data-source/default',
            data: param || {},
            base_url: config.worksys
        }
        return ajax(params).then((resp) => {
            return resolve(resp);
        });
    },    
    job_list({ commit, state, rootState }, param) {
        let params = {
            url: 'jobs/list',
            data: param || {},
            base_url: config.worksys
        }
        return get(params).then((resp) => {
            return resolve(resp);
        });
    },
    job_config({ commit, state, rootState }, param) {
        let params = {
            url: 'jobs/config/'+param,
            base_url: config.worksys
        }
        return get(params).then((resp) => {
            return resolve(resp);
        });
    },
    job_config_update({ commit, state, rootState }, param) {
        let params = {
            url: 'jobs/config/update',
            data: param || {},
            base_url: config.worksys
        }
        return ajax(params).then((resp) => {
            return resolve(resp);
        });
    },
    job_detail_sharding({ commit, state, rootState }, param) {
        let params = {
            url: 'jobs/'+param+'/sharding',
            base_url: config.worksys
        }
        return get(params).then((resp) => {
            return resolve(resp);
        });
    },
    job_detail_disable({ commit, state, rootState }, param) {
        let params = {
            url: 'jobs/'+param.jobName+'/sharding/'+param.item+'/disable',
            base_url: config.worksys
        }
        return post(params).then((resp) => {
            return resolve(resp);
        });
    },
    job_detail_able({ commit, state, rootState }, param) {
        let params = {
            url: 'jobs/'+param.jobName+'/sharding/'+param.item+'/disable/delete',
            base_url: config.worksys
        }
        return post(params).then((resp) => {
            return resolve(resp);
        });
    },
    job_disable({ commit, state, rootState }, param) {
        let params = {
            url: 'jobs/'+param+'/disable',
            base_url: config.worksys
        }
        return post(params).then((resp) => {
            return resolve(resp);
        });
    },
    job_able({ commit, state, rootState }, param) {
        let params = {
            url: 'jobs/'+param+'/disable/delete',
            base_url: config.worksys
        }
        return post(params).then((resp) => {
            return resolve(resp);
        });
    },
    job_trigger({ commit, state, rootState }, param) {
        let params = {
            url: 'jobs/'+param+'/trigger',
            base_url: config.worksys
        }
        return post(params).then((resp) => {
            return resolve(resp);
        });
    },
    job_shutdown({ commit, state, rootState }, param) {
        let params = {
            url: 'jobs/'+param+'/shutdown',
            base_url: config.worksys
        }
        return post(params).then((resp) => {
            return resolve(resp);
        });
    },
    job_config_delete({ commit, state, rootState }, param) {
        let params = {
            url: 'jobs/config/delete/'+param,
            base_url: config.worksys
        }
        return get(params).then((resp) => {
            return resolve(resp);
        });
    },
    jobServer_list({ commit, state, rootState }, param) {
        let params = {
            url: 'servers/list',
            data: param || {},
            base_url: config.worksys
        }
        return get(params).then((resp) => {
            return resolve(resp);
        });
    },    
    jobServer_detail_sharding({ commit, state, rootState }, param) {
        let params = {
            url: 'servers/'+param+'/jobs',
            base_url: config.worksys
        }
        return get(params).then((resp) => {
            return resolve(resp);
        });
    },
    jobServer_detail_disable({ commit, state, rootState }, param) {
        let params = {
            url: 'servers/'+param.serverIp+'/jobs/'+param.item+'/disable',
            base_url: config.worksys
        }
        return post(params).then((resp) => {
            return resolve(resp);
        });
    },
    jobServer_detail_enable({ commit, state, rootState }, param) {
        let params = {
            url: 'servers/'+param.serverIp+'/jobs/'+param.item+'/disable/delete',
            base_url: config.worksys
        }
        return post(params).then((resp) => {
            return resolve(resp);
        });
    },
    jobServer_detail_terminate({ commit, state, rootState }, param) {
        let params = {
            url: 'servers/'+param.serverIp+'/jobs/'+param.item+'/shutdown',
            base_url: config.worksys
        }
        return post(params).then((resp) => {
            return resolve(resp);
        });
    },
    jobServer_detail_delete({ commit, state, rootState }, param) {
        let params = {
            url: 'servers/'+param.serverIp+'/jobs/'+param.item+'/delete',
            base_url: config.worksys
        }
        return post(params).then((resp) => {
            return resolve(resp);
        });
    },
    jobServer_disable({ commit, state, rootState }, param) {
        let params = {
            url: 'servers/'+param+'/disable',
            base_url: config.worksys
        }
        return post(params).then((resp) => {
            return resolve(resp);
        });
    },
    jobServer_trigger({ commit, state, rootState }, param) {        
        let params = {
            url: 'servers/'+param+'/disable/delete',
            base_url: config.worksys
        }
        return post(params).then((resp) => {
            return resolve(resp);
        });
    },
    jobServer_terminate({ commit, state, rootState }, param) {        
        let params = {            
            url: 'servers/'+param+'/shutdown',
            base_url: config.worksys
        }
        return post(params).then((resp) => {
            return resolve(resp);
        });
    },
    jobServer_delete({ commit, state, rootState }, param) {        
        let params = {            
            url: 'servers/'+param+'/delete',
            base_url: config.worksys
        }
        return post(params).then((resp) => {
            return resolve(resp);
        });
    },
    history_path_list({ commit, state, rootState }, param) {
        let params = {
            url: 'event-trace/execution',
            data: param || {},
            base_url: config.worksys
        }
        return ajax(params).then((resp) => {
            return resolve(resp);
        });
    },
    history_status_list({ commit, state, rootState }, param) {
        let params = {
            url: 'event-trace/status',
            data: param || {},
            base_url: config.worksys
        }
        return ajax(params).then((resp) => {
            return resolve(resp);
        });
    },
    work_properties_list({ commit, state, rootState }, param) {
        let params = {
            url: 'job-dbconfig/list',
            data: param || {},
            base_url: config.worksys
        }
        return ajax(params).then((resp) => {
            return resolve(resp);
        });
    },
    work_properties_load({ commit, state, rootState }, param) {
        let params = {
            url: 'job-dbconfig/dbJobconfigToZk',
            data: param || {},
            base_url: config.worksys
        }
        return ajax(params).then((resp) => {
            return resolve(resp);
        });
    },
}

export default actions;
