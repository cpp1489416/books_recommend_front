<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" v-model="queryParams.isbn" placeholder="isbn"
                @keyup.native.enter="reloadPage"/>
      <el-input style="width: 200px;" class="filter-item" v-model="queryParams.title" placeholder="title"
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
      <el-table-column label="" width="80" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.image_url" height="40px"/>
        </template>
      </el-table-column>
      <el-table-column label="isbn" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.isbn}}
        </template>
      </el-table-column>
      <el-table-column label="title">
        <template slot-scope="scope">
          {{ scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="year" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.published_year }}
        </template>
      </el-table-column>
      <el-table-column label="action" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini">edit</el-button>
          <el-button size="mini"> ratings </el-button>
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
          title: null,
          isbn: null,
          order_by: 'id',
          page_number: 1,
          page_size: 10,
        },
        count: 0,
        content: null,
        listLoading: true,
        orderBys: [
          'id', '-id', 'title', '-title', 'isbn', '-isbn'
        ]
      }
    },
    created() {
      this.reloadPage()
    },
    methods: {
      getList: function (info) {
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
        this.ajax.get('/books', {
          params: this.queryParams
        }).then(response => {
          this.count = response.info.count
          this.content = response.info.content
          this.listLoading = false
        }, function () {
        })
      },
      reloadPage: function () {
        this.getList()
      }
    },
    components: {
      Pagination
    }
  }
</script>
