<template>
    <div class="app-container createPost-container">
        <el-form class="form-container" :model="listQuery" :rules="rules" :label-position="'left'" ref="listQuery">
            <div class="createPost-main-container filter-container">
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="路径:" class="postInfo-container-item" label-width="100px">
                            <el-input type="textarea" :rows="4" placeholder="" v-model="listQuery.url">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="22">
                        <el-button class="search-btn" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-form>
        <el-row>
            <el-col :span="23">
                <el-table :data="list" v-loading="listLoading" border stripe fit highlight-current-row style="width: 100%">
                    <el-table-column type="index" width="50" label="序号">
                    </el-table-column>
                    <el-table-column :label="'链接'">
                        <template slot-scope="scope">{{scope.row['url']}}</template>
                    </el-table-column>
                    <el-table-column :label="'状态'" width="150" align="center">
                        <template slot-scope="scope">
                          <el-button type="text" :loading="scope.row['status'] === FETCH_STATUS.loading">{{scope.row['statusText']}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column :label="'压缩包'" width="100" align="center">
                        <template slot-scope="scope">
                            <a v-if="scope.row['zipUrl']" :href="scope.row['zipUrl']" download="">
                                <el-button type="text">下载</el-button>
                            </a>
                            <span v-else>暂无</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as spiderService from '@/api/spider'
import { isURL, hasSpace } from '@/utils/index'

const FETCH_STATUS = {
  loading:1,
  done:2
}
export default {
    name: '',
    components: {},
    data() {
        return {
            listQuery: {
                page: 1,
                limit: 10,
                url:""
            },
            rules: {},
            list: [],
            total: 0,
            listLoading: false,
            FETCH_STATUS:FETCH_STATUS
        }
    },

    mounted: function() {},

    computed: {},
    methods: {
        appendList(url) {
            // 在这里获取列表数据
            const row = {
                url: url,
                status: FETCH_STATUS.loading,
                statusText: "努力抓取中",
                zipUrl: ''
            }
            this.list.push(row)

            spiderService.fetch({ url: url }).then(res => {
                if (res.code === 200) {
                    row.status = FETCH_STATUS.done;
                    row.statusText = "抓取成功";
                    row.zipUrl = spiderService.getDownloadUrl(res.data.zipUrl)
                } else {
                    row.status = FETCH_STATUS.error;
                    row.statusText = `失败：${JSON.stringify(res.msg)}`
                }
            })
        },

        handleSearch() {
            const urlList = this.listQuery.url.trim().split('\n')
            if (this.checkUrl(urlList)) {
                urlList.forEach(url => {
                    this.appendList(url)
                })
            } else {
                this.$message.error(
                    '请检查链接格式！！！！多个链接请换行,链接必须以http或https开头,中间不能有空格'
                )
            }
        },

        checkUrl(urlList) {
            let flag = true
            urlList.forEach(url => {
                if (hasSpace(url.trim()) || !isURL(url.trim())) {
                    flag = false
                }
            })
            return flag
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.table-list-operate {
  margin-bottom: 10px;
}

.item-btn {
  margin: 2px 0;
}
</style>
