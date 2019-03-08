<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" v-model="userId" placeholder="User Id"
                @keyup.native.enter="reloadPage"/>
      <el-select v-model="queryParams.order_by" class="filter-item">
        <el-option v-for="item in orderBys" :value="item"/>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="reloadPage"> Search</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="content"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <!--
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      -->
      <el-table-column label="Book Title" align="center">
        <template slot-scope="scope">
          {{scope.row.book.title }}
        </template>
      </el-table-column>
      <el-table-column label="User Name">
        <template slot-scope="scope">
          {{username}}
        </template>
      </el-table-column>
      <el-table-column label="Rating">
        <template slot-scope="scope">
          {{scope.row.rating}}
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
          location: null,
          order_by: 'id',
          page_number: 1,
          page_size: 10,
        },
        count: 0,
        content: null,
        listLoading: true,
        username: '',
        orderBys: [
          'id', '-id', 'age', '-age'
        ],
        userId: '',
      }
    },
    created() {
      this.userId = this.$route.params.id
      this.reloadPage()
    },
    methods: {
      getList: async function (info) {
        this.listLoading = true
        if (info !== undefined) {
          this.queryParams.page_number = info.page
          this.queryParams.page_size = info.limit
        } else {
          this.queryParams.page_number = 1
        }
        if (this.queryParams.order_by === '') {
          this.queryParams.order_by = 'id'
        }
        await this.ajax.get('/users/' + this.$route.params.id).then(response => {
          this.username = response.info.name
        })
        await this.ajax.get('/ratings/user/' + this.$route.params.id, {
          params: this.queryParams
        }).then(response => {
          this.count = response.info.count
          this.content = response.info.content
          this.listLoading = false
        }, function () {
        })
      },
      reloadPage: function () {
        if (this.userId === '') {
          this.userId = '1'
        }
        if (this.$route.params.id !== this.userId) {
          this.$router.push('/example/rates_of_user/' + this.userId)
        }
        this.getList()
      }
    },
    components: {
      Pagination
    }
  }
</script>
