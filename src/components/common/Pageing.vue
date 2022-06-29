<template>
    <div>
        <el-pagination
        background
        @size-change="hanldSizeChange"
        @current-change="hanldCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :url="url">
        </el-pagination>
    </div>
</template>
<script>
import { getData } from '../../api/api'
export default {
    props: {
        "total": Number,
        "callback": Function,
        "url": String
    },
    data() {
        return {
            currentPage: 1, // 当前页数
            pageSize: 10 // 每页显示条数 
        }
    },
    methods: {
    hanldSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      getData(this.$parent, url, {offset: (this.currentPage-1), limit: val})
    },
    hanldCurrentChange(val) {
      this.currentPage = val
      getData(this.$parent, url, {offset: (val - 1) * this.pageSize, limit: this.pageSize})
    },
    }
}
</script>
<style lang="scss">
.el-pagination {
    text-align: right;
    margin-top: 20px;
}
</style>