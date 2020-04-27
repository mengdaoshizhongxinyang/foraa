<template>
  <div class="list-main">
    <a-list itemLayout="vertical" size="large" :dataSource="listData">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <template v-slot:actions>
          <span :style="`color:${item.isStar?'#189fff':'#00000073'}`">
            <a-icon type="like-o" style="margin-right: 8px" />
            {{item.like}}
          </span>
          <span :style="`color:${item.isLike?'#189fff':'#00000073'}`">
            <a-icon type="star-o" style="margin-right: 8px" />
            {{item.star}}
          </span>
          <span>
            <a-icon type="message" style="margin-right: 8px" />
            {{item.replay}}
          </span>
        </template>
        <a-list-item-meta>
          <template v-slot:title>
            <div class="list-item-meta">
              <a :href="item.href">{{item.title}}</a>
              <img
                slot="title"
                alt="logo"
                width="120"
                height="74"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            </div>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "https://www.antdv.com/",
    title: `ant design vue part ant design vue part ant design vue part ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    replay: Math.floor(Math.random() * 20),
    star: Math.floor(Math.random() * 500 + 50),
    like: Math.floor(Math.random() * 500 + 50),
    isStar:Math.floor(Math.random() * 2),
    isLike:Math.floor(Math.random() * 2)
  });
}

export default {
  data() {
    return {
      listData,
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 3
      }
    };
  }
};
</script>

<style lang="less" scoped>
/deep/.ant-list-item-action {
  margin-top: 0;
}
/deep/.ant-list-item-meta {
  margin-bottom: 0;
}
.list-main {
  height: 100%;
  overflow-x: hidden;
  padding: 0 8px;
}
.list-item-meta {
  display: flex;
  a {
    color: #000000a5;
    flex: 3;
  }
}
</style>