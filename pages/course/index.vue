<template>
  <div
    id="aCoursesList"
    class="bg-fa of"
  >
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a
                    title="全部"
                    href="#"
                    @click="searchOne('')"
                    :class="{active:allIndex}"
                  >全部</a>
                </li>
                <li
                  v-for="(item,index) in subjectNestedList"
                  :key="index"
                  :class="{active:oneIndex==index}"
                >
                  <a
                    :title="item.title"
                    href="#"
                    @click="searchOne(item.id,index)"
                  >{{item.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li
                  v-for="(item,index) in subSubjectList"
                  :key="index"
                  :class="{active:twoIndex==index}"
                >
                  <a
                    :title="item.title"
                    href="#"
                    @click="searchTwo(item.id,index)"
                  >{{item.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':buyCountSort!=''}">
                <a
                  title="关注度"
                  href="#"
                  @click.prevent="searchBuyCount()"
                >关注度&nbsp;
                <span :class="{hide:buyCountSort == ''}">↓</span>
                </a>
              </li>
              
              <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a
                  title="最新"
                  href="#"
                  @click.prevent="searchGmtCreate()"
                >最新&nbsp;
                <span :class="{hide:gmtCreateSort == ''}">↓</span>
                </a>
              </li>
              
              <li :class="{'current bg-orange':priceSort!=''}">
                <a
                  title="价格"
                  href="#"
                  @click.prevent="searchPrice()"
                >价格&nbsp;
                  <span :class="{hide:priceSort == ''}" >↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section
            class="no-data-wrap"
            v-if="data.total == 0"
          >
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article
            class="comm-course-list"
            v-if="data.total > 0"
          >
            <ul
              class="of"
              id="bna"
            >
              <li
                v-for="course in data.records"
                :key="course.id"
              >
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img
                      :src="course.cover"
                      class="img-responsive"
                      :alt="course.title"
                    >
                    <div class="cc-mask">
                      <a
                        :href="'/course/'+course.id"
                        title="开始学习"
                        class="comm-btn c-btn-1"
                        target="_blank"
                      >开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a
                      :href="'/course/'+course.id"
                      :title="course.title"
                      class="course-title fsize18 c-333"
                      target="_blank"
                    >{{course.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span
                      class="fr jgTag bg-green"
                      v-if="Number(course.price) === 0"
                    >
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{course.buyCount}}人学习</i>
                      |
                      <i class="c-999 f-fA">{{course.viewCount}}人浏览</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)"
            >首</a>
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(data.current-1)"
            >&lt;</a>
            <a
              v-for="page in data.pages"
              :key="page"
              :class="{current: data.current == page, undisable: data.current == page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="gotoPage(page)"
            >{{ page }}</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(data.current+1)"
            >&gt;</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="末页"
              @click.prevent="gotoPage(data.pages)"
            >末</a>
            <div class="clear" />
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import courseApi from '@/api/course';
export default {
  data() {
    return {
      page: 1,
      data: {},//显示的课程列表
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表
      searchObj: {}, // 查询表单对象

      oneIndex: -1,//做一级分类被选中的效果
      twoIndex: -1,//做二级分类被选中的效果
      allIndex: -1,
      buyCountSort: "",
      gmtCreateSort: "",
      priceSort: ""
    }
  },
  created() {
    //获取第一页课程列表
    this.initCourseFirst();
    //获取分类
    this.initSubject();
  },
  methods: {
    //查询第一页的数据
    initCourseFirst() {
      courseApi.pageCourseList(1, 8, this.searchObj)
        .then((result) => {
          this.data = result.data
          console.log(this.data)
        })
    },

    //查询所有一级分类
    initSubject() {
      courseApi.getAllSubject()
        .then((result) => {
          this.subjectNestedList = result.data.list
        })
    },

    //分页切换
    gotoPage(page) {
      if (page > this.data.pages) {
        page = this.data.pages
      }
      courseApi.pageCourseList(page, 8, this.searchObj)
        .then((result) => {
          this.data = result.data
        })
    },
    //点击某个一级分类，查询对应的二级分类
    searchOne(subjectParentId, index) {
      //把传递过来的index值赋值给oneIndex 被选中的样式生效
      this.oneIndex = index

      this.allIndex = false
      this.twoIndex = -1
      this.searchObj.subjectId = ""
      this.subSubjectList = []
      if (subjectParentId == "") {
        this.allIndex = true
      }

      //点击某个一级分类后，将这个一级分类的id赋值给查询条件
      this.searchObj.subjectParentId = subjectParentId
      //点击某个一级分类进行条件查询
      this.gotoPage(1)
      //拿着点击一级分类id 和 所有一级分类id比较，
      //如果id相同，从一级分类里面获取对应的二级分类
      for (let i = 0; i < this.subjectNestedList.length; i++) {
        if (this.subjectNestedList[i].id == subjectParentId) {
          this.subSubjectList = this.subjectNestedList[i].children
        }
      }
    },
    //点击某个二级分类，显示对应二级分类的课程
    searchTwo(subjectId, index) {
      //对应二级分类添加被选中样式
      this.twoIndex = index
      //添加查询条件
      this.searchObj.subjectId = subjectId
      //进行条件查询
      this.gotoPage(1)
    },

    //点击关注度降序
    searchBuyCount() {
      this.buyCountSort = "1"
      this.gmtCreateSort = ""
      this.priceSort = ""

      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = ""
      this.searchObj.priceSort = ""

      this.gotoPage(1)
    },

    //点击最新
    searchGmtCreate(){
      this.buyCountSort = ""
      this.gmtCreateSort = "1"
      this.priceSort = ""

      this.searchObj.buyCountSort = ""
      this.searchObj.gmtCreateSort = this.gmtCreateSort
      this.searchObj.priceSort = ""

      this.gotoPage(1)
    },
    
    //点击根据价格降序
    searchPrice(){
      this.buyCountSort = ""
      this.gmtCreateSort = ""
      this.priceSort = "1"

      this.searchObj.buyCountSort = ""
      this.searchObj.gmtCreateSort = ""
      this.searchObj.priceSort = this.priceSort

      this.gotoPage(1)
    }


  },
};

</script>
<style scoped>
.active {
  background: #bdbdbd;
}
.hide {
  display: none;
}
.show {
  display: block;
}
</style>