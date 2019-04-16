<template>
  <div class="app-container">
    <div class="filter-container" v-loading="listLoading">
      <label class="el-form-item__label">
        Recommendations for "{{username}}":
      </label>
      <el-input
        v-model="queryParams.k"
        style="width: 200px;"
        class="filter-item"
        placeholder="k (recommend param)"
        @keyup.native.enter="reloadPage"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="reloadPage">Recommend</el-button>
      <el-button class="filter-item" icon="el-icon-back" @click="$router.back()">Back</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="content"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="" width="80" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.image_url" height="40px">
        </template>
      </el-table-column>
      <el-table-column label="isbn" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.isbn }}
        </template>
      </el-table-column>
      <el-table-column label="title">
        <template slot-scope="scope">
          {{ scope.row.title }}
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
          <el-button size="mini" @click="jumpToRatings(scope.row.id)"> ratings </el-button>
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
  components: {
    Pagination
  },
  data() {
    return {
      queryParams: {
        k: 4,
        order_by: 'id',
        page_number: 1,
        page_size: 10
      },
      count: 0,
      content: null,
      listLoading: true,
      username: '',
      orderBys: [
        'id', '-id', 'title', '-title', 'isbn', '-isbn'
      ]
    }
  },
  created() {
    this.reloadPage()
  },
  methods: {
    async getList(info) {
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
      await this.ajax.get('users/' + this.$route.params.id, {
      }).then(response => {
        this.username = response.info.name
      })
      await this.ajax.get('/recommendations/user/' + this.$route.params.id, {
        params: this.queryParams
      }).then(response => {
        this.count = response.info.count
        this.content = response.info.content
        this.listLoading = false
      }, function() {
      })
    },
    reloadPage: function() {
      this.getList()
    },
    jumpToRatings(id) {
      this.$router.push({
        name: 'ratings_of_book',
        params: {
          id: id
        }
      })
    }
  }
}
</script>
