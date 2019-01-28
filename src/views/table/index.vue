<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search">
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-download">
      </el-button>
      <el-checkbox class="filter-item" style="margin-left:15px;">
      </el-checkbox>
    </div>

    <el-table
      v-loading="listLoading"
      :data="content"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="name">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="desc" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="count"
      :page.sync="queryParams.page_number"
      :limit.sync="queryParams.page_size"
      @pagination="getList"/>
  </div>
</template>

<script>
  import {getList} from '@/api/table'
  import merge from 'webpack-merge'
  import Pagination from '@/components/Pagination'

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        queryParams: {
          name: null,
          desc: null,
          order_by: 'id',
          page_number: 1,
          page_size: 10,
        },
        count: 40,
        content: null,
        listLoading: true
      }
    },
    created() {
      this.ajax.get('/books', {
        params: this.$route.query
      }).then(response => {
        console.log(response)
        this.content = response.info.content
        this.count = response.info.count
        this.listLoading = false
      }, function () {
      })
    },
    methods: {
      getList: function (info) {
        this.listLoading = true
        if (info !== null) {
          this.queryParams.page_number = info.page
          this.queryParams.page_size = info.limit
        }
        this.ajax.get('/books', {
          params: this.queryParams
        }).then(response => {
          this.count = response.info.count
          this.content = response.info.content
          this.listLoading = false
        }, function () {
        })
      }
    },
    components: {
      Pagination
    }
  }
</script>
