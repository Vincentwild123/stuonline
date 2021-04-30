# 头大-Online API 文档

## 1. 帖子模块

### 1.1 创建帖子

**接口说明:**

- 用户发表帖子

**请求 URL:**

- /post/createPost

**请求方式:**

- POST

**请求参数:**

| 参数         | 类型         | 说明                                                         |
| ------------ | ------------ | ------------------------------------------------------------ |
| postHidename | int          | 是否匿名；0 为非匿名,1 为匿名                               |
| postText     | String       | 帖子内容                                                     |
| postModule   | int          | 帖子所属模块；0 为闲聊,1 为学业咨询,2 为组队,3 为经验分享 |
| tagNameList  | List<String> | 用户自定义的标签名字                                         |
| image1       | File         | 图片 1(非必填)                                             |
| image2       | File         | 图片 2(非必填)                                             |
| image3       | File         | 图片 3(非必填)                                             |

**返回数据:**

| 参数        | 类型    | 说明         |
| ----------- | ------- | ------------ |
| success     | boolean | 请求成功与否 |
| information | Sting   | 返回信息     |

**返回示例:**

```json
{
    "success": true,
    "information": "创建成功"
}

{
    "success": false,
    "information": "发帖失败,文字不得超过1024个字"
}

{
    "success": false,
    "information": "上传文件不为图片文件"
}
```

### 1.2 删除帖子

**接口说明:**

- 用户删除帖子

**请求 URL:**

- /post/deletePost/{postId}

**请求方式:**

- DELETE

**请求参数:**

| 参数   | 类型 | 说明    |
| ------ | ---- | ------- |
| postId | long | 帖子 id |

**无返回**

### 1.3 修改帖子

#### 1.3.1 获取帖子内容

**接口说明:**

- 用户进入修改页面获取帖子的信息

**请求 URL:**

- /post/updatePost/get/{postId}

**请求方式:**

- GET

**请求参数:**

| 参数   | 类型 | 说明    |
| ------ | ---- | ------- |
| postId | long | 帖子 id |

**返回数据:**

| 参数         | 类型        | 说明                                                         |
| ------------ | ----------- | ------------------------------------------------------------ |
| postId       | long        | 帖子 id                                                      |
| postHidename | int         | 是否匿名；0 为非匿名,1 为匿名                               |
| postModule   | int         | 帖子所属模块；0 为闲聊,1 为学业咨询,2 为组队,3 为经验分享 |
| postText     | String      | 帖子内容                                                     |
| postImages   | List<Sting> | 帖子图片链接                                                 |
| tagList      | List<Sting> | 帖子标签                                                     |

**返回示例:**

```json
{
  "postId": 13,
  "postHidename": 0,
  "postModule": 1,
  "postText": "合合postman ",
  "postImages": [
    "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2021/2/23/bcc7b815-b25c-4f88-a12e-2d73ad3d9365.jpg",
    "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2021/2/23/86876d90-08c0-4b06-81eb-c8f29fe01942.jpg",
    "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2021/2/23/57fcd42a-2b79-4435-851c-1ba3c44bf2a7.jpg"
  ],
  "tagList": ["aa", "aj"]
}
```

#### 1.3.2 修改帖子

**接口说明:**

- 用户修改帖子

**请求 URL:**

- /post/updatePost/update/{postId}

**请求方式:**

- PATCH

**请求参数:**

| 参数         | 类型         | 说明                                                         |
| ------------ | ------------ | ------------------------------------------------------------ |
| postId       | long         | 帖子 id                                                      |
| postHidename | int          | 是否匿名；0 为非匿名,1 为匿名                               |
| postModule   | int          | 帖子所属模块；0 为闲聊,1 为学业咨询,2 为组队,3 为经验分享 |
| postText     | String       | 帖子内容                                                     |
| tagList      | List<String> | 用户自定义的标签名字                                         |
| image1       | File         | 图片 1(非必填)                                             |
| image2       | File         | 图片 2(非必填)                                             |
| image3       | File         | 图片 3(非必填)                                             |

**返回数据:**

| 参数        | 类型    | 说明         |
| ----------- | ------- | ------------ |
| success     | boolean | 请求成功与否 |
| information | Sting   | 返回信息     |

**返回示例:**

```json
{
    "success": true,
    "information": "修改成功"
}

{
    "success": false,
    "information": "修改失败,文字不得超过1024个字"
}

{
    "success": false,
    "information": "上传文件不为图片文件"
}
```

### 1.4 查看帖子详情

**接口说明:**

- 点击某帖子查看详情

**请求 URL:**

- /post/getPost/{postId}

**请求方式:**

- GET

**请求参数:**

| 参数   | 类型 | 说明    |
| ------ | ---- | ------- |
| postId | long | 帖子 id |

**返回数据:**

| 参数         | 类型         | 说明                                                         |
| ------------ | ------------ | ------------------------------------------------------------ |
| postId       | long         | 帖子 id                                                      |
| postHidename | int          | 是否匿名；0 为非匿名,1 为匿名                               |
| postDatetime | String       | 帖子发表时间                                                 |
| postModule   | int          | 帖子所属模块；0 为闲聊,1 为学业咨询,2 为组队,3 为经验分享 |
| postLike     | int          | 帖子点赞数                                                   |
| postComents  | int          | 帖子评论数                                                   |
| postText     | String       | 帖子内容                                                     |
| postImages   | List<String> | 帖子图片链接                                                 |
| userId       | long         | 发帖人 id                                                    |
| userName     | String       | 发帖人用户名                                                 |
| userHead     | String       | 发帖人用户头像链接                                           |
| userLevel    | int          | 发帖人用户等级                                               |
| userBadges   | List<String> | 发帖人用户勋章链接                                           |
| tagList      | List<String> | 帖子标签                                                     |
| like         | boolean      | 当前用户是否对该帖子点过赞                                   |

**返回示例:**

```json
{
  "postSimple": {
    "postId": 13,
    "postHidename": 1,
    "postDatetime": "2021-02-23T23:59:43",
    "postModule": 3,
    "userId": 1,
    "postLike": 2,
    "postComents": 0,
    "postText": "update"
  },
  "postImages": [
    "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2021/2/24/f1718814-e6f3-4694-a9c8-24ffc8680479.png",
    "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2021/2/24/210c2051-cd20-446c-9102-b55bf217b7a0.png",
    "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2021/2/23/57fcd42a-2b79-4435-851c-1ba3c44bf2a7.jpg"
  ],
  "userSimple": {
    "userId": 1,
    "userName": "Joe",
    "userHead": "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2020/12/22/f65856b8-91f0-47f5-b082-dac194808eff.jpg",
    "userLevel": 0
  },
  "userBadges": [],
  "tagList": ["aa", "aj", "胡"],
  "like": false
}
```

### 1.5 查看帖子评论

#### 1.5.1 查看帖子一级评论

**接口说明:**

- 查看帖子的一级评论

**请求 URL:**

- /post/getPostComment/{postId}/{comId}/{limit}

**请求方式:**

- GET

**请求参数:**

| 参数   | 类型 | 说明                                          |
| ------ | ---- | --------------------------------------------- |
| postId | long | 帖子 id                                       |
| comId  | long | 当前页最后一条评论的 id,若要获取最新的则传 0 |
| limit  | int  | 页面大小(多少条评论)                        |

**返回数据:**

| 参数       | 类型         | 说明                                          |
| ---------- | ------------ | --------------------------------------------- |
| comId      | long         | 当前页最后一条评论的 id,若要获取最新的则传 0 |
| comTime    | String       | 评论时间                                      |
| comText    | String       | 评论内容                                      |
| userId     | long         | 评论者 id                                     |
| userName   | String       | 评论者用户名                                  |
| userHead   | String       | 评论者头像链接                                |
| userLevel  | int          | 评论者等级                                    |
| userBadges | List<String> | 评论者勋章链接                                |

**返回示例:**

```json
[
  {
    "comId": 2,
    "comTime": "2021-02-25T09:03:10",
    "comText": "comment testssssss",
    "userSimple": {
      "userId": 2,
      "userName": "Joseph",
      "userHead": "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2020/12/22/f65856b8-91f0-47f5-b082-dac194808eff.jpg",
      "userLevel": 0
    },
    "userBadges": []
  }
]
```

#### 1.5.2 查看帖子二级评论

**接口说明:**

- 查看帖子中某条一级评论的二级评论

**请求 URL:**

- /post/getPostSecondComment/{postId}/{comSecond}/{comId}/{limit}

**请求方式:**

- GET

**请求参数:**

| 参数      | 类型 | 说明                                          |
| --------- | ---- | --------------------------------------------- |
| postId    | long | 帖子 id                                       |
| comSecond | long | 一级评论 id                                   |
| comId     | long | 当前页最后一条评论的 id,若要获取最新的则传 0 |
| limit     | int  | 页面大小(多少条评论)                        |

**返回数据:**

| 参数       | 类型         | 说明                                          |
| ---------- | ------------ | --------------------------------------------- |
| comId      | long         | 当前页最后一条评论的 id,若要获取最新的则传 0 |
| comTime    | String       | 评论时间                                      |
| comText    | String       | 评论内容                                      |
| userId     | long         | 评论者 id                                     |
| userName   | String       | 评论者用户名                                  |
| userHead   | String       | 评论者头像链接                                |
| userLevel  | int          | 评论者等级                                    |
| userBadges | List<String> | 评论者勋章链接                                |

**返回示例:**

```json
[
  {
    "comId": 5,
    "comTime": "2021-02-25T11:12:33",
    "comText": "second comment testssssss",
    "userSimple": {
      "userId": 2,
      "userName": "Joseph",
      "userHead": "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2020/12/22/f65856b8-91f0-47f5-b082-dac194808eff.jpg",
      "userLevel": 0
    },
    "userBadges": []
  }
]
```

### 1.6 获取帖子列表

#### 1.6.1 无条件获取帖子列表

**接口说明:**

- 没有约束条件获取帖子列表

**请求 URL:**

- /post/getPostList/{postId}/{limit}

**请求方式:**

- GET

**请求参数:**

| 参数   | 类型 | 说明                                                |
| ------ | ---- | --------------------------------------------------- |
| postId | long | 当前页最后一条帖子的 id,若要获取最新的帖子,则传 0 |
| limit  | int  | 页面大小(多少条帖子)                              |

**返回参数:**

| 参数         | 类型         | 说明                                                         |
| ------------ | ------------ | ------------------------------------------------------------ |
| postId       | long         | 帖子 id                                                      |
| postHidename | int          | 是否匿名；0 为非匿名,1 为匿名                               |
| postDatetime | String       | 帖子发表时间                                                 |
| postModule   | int          | 帖子所属模块；0 为闲聊,1 为学业咨询,2 为组队,3 为经验分享 |
| postLike     | int          | 帖子点赞数                                                   |
| postComents  | int          | 帖子评论数                                                   |
| postText     | String       | 帖子内容                                                     |
| postImages   | List<String> | 帖子图片链接                                                 |
| userName     | String       | 用户名                                                       |
| userHead     | String       | 用户头像链接                                                 |
| userLevel    | int          | 用户等级                                                     |
| userBadges   | List<String> | 用户勋章链接                                                 |
| tagList      | List<String> | 帖子标签                                                     |
| like         | boolean      | 当前用户是否对该帖子点过赞                                   |

**返回示例:**

```json
[
  {
    "postSimple": {
      "postId": 13,
      "postHidename": 1,
      "postDatetime": "2021-02-23T23:59:43",
      "postModule": 3,
      "userId": 1,
      "postLike": 0,
      "postComents": 0,
      "postText": "update"
    },
    "postImages": [
      "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2021/2/24/f1718814-e6f3-4694-a9c8-24ffc8680479.png",
      "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2021/2/24/210c2051-cd20-446c-9102-b55bf217b7a0.png",
      "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2021/2/23/57fcd42a-2b79-4435-851c-1ba3c44bf2a7.jpg"
    ],
    "userSimple": {
      "userId": 1,
      "userName": "Joe",
      "userHead": "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2020/12/22/f65856b8-91f0-47f5-b082-dac194808eff.jpg",
      "userLevel": 0
    },
    "userBadges": [],
    "tagList": ["aa", "aj", "胡"],
    "like": false
  }
]
```

#### 1.6.2 根据标签名字获取帖子列表

**接口说明:**

- 根据标签名字模糊查询帖子列表

**请求 URL:**

- /post/getTagPostList/{tag}/{postId}/{limit}

**请求方式:**

- GET

**请求参数:**

| 参数   | 类型   | 说明                                                       |
| ------ | ------ | ---------------------------------------------------------- |
| tag    | String | 所要查询的标签名字,使用的是模糊查询,所以标签名字可以不全 |
| postId | long   | 当前页最后一条帖子的 id,若要获取最新的帖子,则传 0        |
| limit  | int    | 页面大小(多少条帖子)                                     |

**返回参数:**

| 参数         | 类型         | 说明                                                         |
| ------------ | ------------ | ------------------------------------------------------------ |
| postId       | long         | 帖子 id                                                      |
| postHidename | int          | 是否匿名；0 为非匿名,1 为匿名                               |
| postDatetime | String       | 帖子发表时间                                                 |
| postModule   | int          | 帖子所属模块；0 为闲聊,1 为学业咨询,2 为组队,3 为经验分享 |
| postLike     | int          | 帖子点赞数                                                   |
| postComents  | int          | 帖子评论数                                                   |
| postText     | String       | 帖子内容                                                     |
| postImages   | List<String> | 帖子图片链接                                                 |
| userName     | String       | 用户名                                                       |
| userHead     | String       | 用户头像链接                                                 |
| userLevel    | int          | 用户等级                                                     |
| userBadges   | List<String> | 用户勋章链接                                                 |
| tagList      | List<String> | 帖子标签                                                     |
| like         | boolean      | 当前用户是否对该帖子点过赞                                   |

**返回示例:**

```json
[
  {
    "postSimple": {
      "postId": 12,
      "postHidename": 0,
      "postDatetime": "2021-02-23T23:53:49",
      "postModule": 2,
      "userId": 1,
      "postLike": 0,
      "postComents": 0,
      "postText": "合合postman "
    },
    "postImages": [
      "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2021/2/23/87a480b9-1982-4e5e-9abc-6cd7acdc7f3f.jpg",
      "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2021/2/23/e67077cb-bf86-440f-b360-40c1a981a387.jpg",
      "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2021/2/23/66b7398d-f22c-4a3b-9d7f-3725d24d1f94.jpg"
    ],
    "userSimple": {
      "userId": 1,
      "userName": "Joe",
      "userHead": "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2020/12/22/f65856b8-91f0-47f5-b082-dac194808eff.jpg",
      "userLevel": 0
    },
    "userBadges": [],
    "tagList": ["aa", "aj"],
    "like": false
  }
]
```

#### 1.6.3 根据帖子模块获取列表

**接口说明:**

- 根据标签名字模糊查询帖子列表

**请求 URL:**

- /post/getModulePostList/{postModule}/{postId}/{limit}

**请求方式:**

- GET

**请求参数:**

| 参数       | 类型 | 说明                                                         |
| ---------- | ---- | ------------------------------------------------------------ |
| postModule | int  | 帖子所属模块；0 为闲聊,1 为学业咨询,2 为组队,3 为经验分享 |
| postId     | long | 当前页最后一条帖子的 id,若要获取最新的帖子,则传 0          |
| limit      | int  | 页面大小(多少条帖子)                                       |

**返回参数:**

| 参数         | 类型         | 说明                                                         |
| ------------ | ------------ | ------------------------------------------------------------ |
| postId       | long         | 帖子 id                                                      |
| postHidename | int          | 是否匿名；0 为非匿名,1 为匿名                               |
| postDatetime | String       | 帖子发表时间                                                 |
| postModule   | int          | 帖子所属模块；0 为闲聊,1 为学业咨询,2 为组队,3 为经验分享 |
| postLike     | int          | 帖子点赞数                                                   |
| postComents  | int          | 帖子评论数                                                   |
| postText     | String       | 帖子内容                                                     |
| postImages   | List<String> | 帖子图片链接                                                 |
| userName     | String       | 用户名                                                       |
| userHead     | String       | 用户头像链接                                                 |
| userLevel    | int          | 用户等级                                                     |
| userBadges   | List<String> | 用户勋章链接                                                 |
| tagList      | List<String> | 帖子标签                                                     |
| like         | boolean      | 当前用户是否对该帖子点过赞                                   |

**返回示例:**

```json
[
  {
    "postSimple": {
      "postId": 6,
      "postHidename": 1,
      "postDatetime": "2021-02-23T23:48:10",
      "postModule": 3,
      "userId": 1,
      "postLike": 0,
      "postComents": 0,
      "postText": "update"
    },
    "postImages": [
      "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2021/2/24/7d032f2b-b6fc-4e7e-a280-accbc01f0992.png",
      "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2021/2/24/32abf1b1-3d85-4f27-a27c-5244dd772e9d.png"
    ],
    "userSimple": {
      "userId": 1,
      "userName": "Joe",
      "userHead": "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2020/12/22/f65856b8-91f0-47f5-b082-dac194808eff.jpg",
      "userLevel": 0
    },
    "userBadges": [],
    "tagList": ["aa", "胡"],
    "like": false
  }
]
```

### 1.7 点赞帖子

#### 1.7.1 点赞帖子

**接口说明:**

- 用户点赞某帖子

**请求 URL:**

- /post/like/{postId}

**请求方式:**

- POST

**请求参数:**

| 参数   | 类型 | 说明    |
| ------ | ---- | ------- |
| postId | long | 帖子 id |

**无返回**

#### 1.7.2 取消点赞帖子

**接口说明:**

- 用户取消点赞某帖子

**请求 URL:**

- /post/unlike/{postId}

**请求方式:**

- DELETE

**请求参数:**

| 参数   | 类型 | 说明    |
| ------ | ---- | ------- |
| postId | long | 帖子 id |

**无返回**

### 1.8 评论帖子

**接口说明:**

- 用户评论某帖子或帖子中的某条评论

**请求 URL:**

- /post/createComment

**请求方式:**

- POST

**请求参数:**

| 参数        | 类型   | 说明                                              |
| ----------- | ------ | ------------------------------------------------- |
| postId      | long   | 帖子 id                                           |
| comText     | String | 评论内容                                          |
| comSourceId | long   | 被评论对象 id,若为一级评论,则是发帖人的 id      |
| comLv       | int    | 评论等级,0 为一级评论,1 为二级评论              |
| comSecond   | long   | 若为二级评论,则是评论哪条一级评论的 id(非必填) |

**返回数据:**

| 参数        | 类型    | 说明         |
| ----------- | ------- | ------------ |
| success     | boolean | 请求成功与否 |
| information | Sting   | 返回信息     |

**返回示例:**

```json
{
    "success": true,
    "information": "评论成功"
}

{
    "success": false,
    "information": "评论失败,评论字数不得超过256个字"
}
```

### 1.9 热门标签

**接口说明:**

- 获取若干条最热门的标签

**请求 URL:**

- /post/topTag/{num}

**请求方式:**

- GET

**请求参数:**

| 参数 | 类型 | 说明       |
| ---- | ---- | ---------- |
| num  | int  | num 个标签 |

**返回示例:**

```json
["胡", "aj", "aa"]
```

## 2. 勋章模块

### 2.1 获取用户勋章

#### 2.1.1 获取用户的团队勋章

**接口说明:**

- 获取用户所拥有的团队勋章

**请求 URL:**

- /badge/getTeamBadge/{userId}

**请求方式:**

- GET

**请求参数:**

| 参数   | 类型 | 说明    |
| ------ | ---- | ------- |
| userId | long | 用户 id |

**返回数据:**

| 参数      | 类型   | 说明     |
| --------- | ------ | -------- |
| teamName  | String | 团队名   |
| badgePath | String | 勋章链接 |
| badgeId   | long   | 勋章 id  |

**返回示例:**

```json
[
  {
    "teamName": "team1",
    "badgePath": "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2020/12/22/7bf90434-4908-4ccd-baf6-dc3e4154f86f.jpg",
    "badgeId": 2
  }
]
```

#### 2.1.2 获取用户的成就勋章

**接口说明:**

- 获取用户所拥有的成就勋章

**请求 URL:**

- /badge/getAchievementBadge/{userId}

**请求方式:**

- GET

**请求参数:**

| 参数   | 类型 | 说明    |
| ------ | ---- | ------- |
| userId | long | 用户 id |

**返回数据:**

| 参数            | 类型   | 说明               |
| --------------- | ------ | ------------------ |
| badgePath       | String | 勋章链接           |
| badgeId         | long   | 勋章 id            |
| achUserExp      | int    | 用户成就点数       |
| achieveUserTime | String | 用户获得成就的时间 |
| achievementName | String | 成就名称           |

**返回示例:**

```json
[
  {
    "badgePath": "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2020/12/22/7bf90434-4908-4ccd-baf6-dc3e4154f86f.jpg",
    "badgeId": 2,
    "achUserExp": 999,
    "achieveUserTime": "2021-02-25T23:15:33",
    "achievementName": "achi"
  }
]
```

#### 2.1.3 获取用户所佩戴的勋章

**接口说明:**

- 获取用户所佩戴的勋章链接

**请求 URL:**

- /badge/getWearingBadge/{userId}

**请求方式:**

- GET

**请求参数:**

| 参数   | 类型 | 说明    |
| ------ | ---- | ------- |
| userId | long | 用户 id |

**返回示例:**

```json
[
  "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2020/12/22/96549106-19a9-4ecd-a282-bd04b6a869c6.jpg",
  "https://stu-online-1259811308.cos.ap-guangzhou.myqcloud.com/stu-online/2020/12/22/7bf90434-4908-4ccd-baf6-dc3e4154f86f.jpg"
]
```

### 2.2 更换用户勋章

**接口说明:**

- 当前用户更换或卸下所佩戴的勋章

**请求 URL:**

- /badge/updateBadge/{place}/{badgeId}

**请求方式:**

- PATCH

**请求参数:**

| 参数    | 类型 | 说明                                                  |
| ------- | ---- | ----------------------------------------------------- |
| place   | int  | 所更换的位置(0~4)                                   |
| badgeId | long | 所要更换的勋章 id,若要卸下该位置所佩戴的勋章,则传 0 |

**无返回**

## 3. 通知模块

### 3.1 获取当前用户未读通知数量

**接口说明:**

- 获取当前用户各个类型未读通知的数量

**请求 URL:**

- /notice/getNoticeCount

**请求方式:**

- GET

**无请求参数**

**返回数据:**

| 参数       | 类型 | 说明               |
| ---------- | ---- | ------------------ |
| commentNum | int  | 未读评论通知的数量 |
| systemNum  | int  | 未读系统通知的数量 |
| teamNum    | int  | 未读团队通知的数量 |
| taskNum    | int  | 未读任务通知的数量 |
| likeNum    | int  | 未读点赞通知的数量 |

**返回示例:**

```json
{
  "commentNum": 2,
  "systemNum": 1,
  "teamNum": 3,
  "taskNum": 1,
  "likeNum": 1
}
```

### 3.2 获取通知

**接口说明:**

- 根据通知类型获取通知,先获取未读的,再获取已读的,获取后,将未读的通知设置为已读

**请求 URL:**

- /notice/getNotice/{noticeType}/{noticeId}/{limit}

**请求方式:**

- PATCH

**请求参数:**

| 参数       | 类型 | 说明                                                       |
| ---------- | ---- | ---------------------------------------------------------- |
| noticeType | int  | 通知类型；0 为点赞,1 为评论,2 为团队,3 为任务,4 为系统 |
| noticeId   | long | 当前页最后一条通知的 id,若要获取最新的,则传 0            |
| limit      | int  | 每页大小(多少条通知)                                     |

**返回数据:**

| 参数         | 类型   | 说明                                                                                                                                                 |
| ------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| noticeId     | long   | 通知 id                                                                                                                                              |
| noticeText   | String | 通知内容                                                                                                                                             |
| noticeTime   | String | 通知时间                                                                                                                                             |
| noticeStatus | int    | 通知状态；0 为未读,1 为已读                                                                                                                         |
| noticeType   | int    | 通知类型；0 为帖子点赞通知,1 为一级评论通知,2 为二级评论通知,3 为团队普通通知,4 为团队邀请通知,5 为团队申请加入通知,6 为任务通知,7 为系统通知 |
| linkId       | long   | 若是点赞通知或一级评论通知,则返回帖子 id；若是二级评论,则返回一级评论的 id                                                                         |

**返回示例:**

```json
[
  {
    "noticeId": 3,
    "noticeText": "Joe回复了您的评论:notice comment testssssss",
    "noticeTime": "2021-02-26T00:06:49",
    "userId": 1,
    "noticeStatus": 0,
    "noticeType": 2,
    "linkId": 1
  }
]
```

## 4. 用户模块

### 4.1 用户注册发送验证码

**接口说明:**

- 用户注册发送验证码(无需 token)

**请求 URL:**

- /user/sendLogonMail/{to}

**请求方式:**

- POST

**请求参数:**

| 参数 | 类型   | 说明     |
| ---- | ------ | -------- |
| to   | String | 注册邮箱 |

**返回数据:**

| 参数        | 类型    | 说明         |
| ----------- | ------- | ------------ |
| success     | boolean | 请求成功与否 |
| information | Sting   | 返回信息     |

**返回示例:**

```json
{
    "success": true,
    "information": "验证码发送成功"
}

{
    "success": false,
    "information": "该邮箱非汕头大学邮箱,无法注册"
}

{
    "success": false,
    "information": "距上次发送验证码至该邮箱不足2分钟,请稍后再次尝试"
}
```

### 4.2 用户修改密码发送验证码

**接口说明:**

- 用户修改密码,邮箱发送验证码

**请求 URL:**

- /user/sendModifyMail

**请求方式:**

- POST

**无请求参数**

**返回数据:**

| 参数        | 类型    | 说明         |
| ----------- | ------- | ------------ |
| success     | boolean | 请求成功与否 |
| information | Sting   | 返回信息     |

**返回示例:**

```json
{
    "success": true,
    "information": "验证码发送成功"
}

{
    "success": false,
    "information": "距上次发送验证码至该邮箱不足2分钟,请稍后再次尝试"
}
```

### 4.3 验证验证码

**接口说明:**

- 验证验证码(无需 token)

**请求 URL:**

- /user/verify/{to}/{code}

**请求方式:**

- POST

**请求参数:**

| 参数 | 类型   | 说明             |
| ---- | ------ | ---------------- |
| to   | String | 收件人邮箱       |
| code | String | 用户输入的验证码 |

**返回数据:**

| 参数        | 类型    | 说明         |
| ----------- | ------- | ------------ |
| success     | boolean | 请求成功与否 |
| information | Sting   | 返回信息     |

**返回示例:**

```json
{
    "success": true,
    "information": "验证成功!"
}

{
    "success": false,
    "information": "验证码已过期"
}

{
    "success": false,
    "information": "验证码错误"
}
```
