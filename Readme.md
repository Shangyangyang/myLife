## 前言
这是一个uniapp的练手项目，会有好多我没接触过的功能练习，可以拿去参考参考
## 开发计划

- [ ] 汽车消费模块开发
	* [x] 添加功能
		+ [x] 先验证登录
		+ [x] 提交相关
	* [ ] 离线数据功能
		+ [ ] 下载数据为缓存数据功能
		+ [ ] 新增离线数据功能
		+ [ ] 离线数据批量上传功能
		+ [ ] 离线数据转为json复制功能
	* [ ] 统计汇总
		+ [x] 百公里油耗
		+ [ ] 按年、按季度统计花费
		+ [ ] 油耗曲线图
		+ [ ] 油价曲线图
		+ [ ] 按type饼图
- [ ] 两年书计划模块开发
	* [ ] 首页
		+ [ ] 进度，计划进度，差距
	* [ ] 功能设计
		+ [ ] 在列表中，要有一个后期补数据的功能，就是可以后期再去查验该难题是否已经解决。
- [ ] 体重与运动量管理（健康管理）
	* [ ] 首页
		+ [ ] 进度，计划进度，差距
	* [ ] 功能设计
		+ [ ] 体重（每日体重或阶段体重）
		+ [ ] 运动量（每日递增的功能）	
- [ ] BUG列表
	* [ ] 解决登录状态没有持久保存的问题。
- [x] <<完成>> 通用表单的处理
	* [x] 完成通用表单的逻辑验证
	* [x] 完成通用表单的自定义验证
	* [x] 解决未正确验证表单的BUG
		+ [x] 难以承受之痛，女神也会变老。呜呜呜
- [x] <<完成>>完成特定tabar需要登录的功能
	* [x] 研究公司项目登录是怎么实现的
		+ [x] 第一步，store的实现
		+ [x] 第二步，后端的处理
		+ [x] 第三步，存储用户信息到store
	* [x] 研究请求统一携带session的功能
	* [x] 完成登录功能
		+ [x] 点击我的，先验证登录
		+ [x] 先做页面
		+ [x] 登录的相关请求
- [x] <<完成>>验证是否登录的通用组件
	* [x] 没有登录则跳转到首页

## 亮点
### 通用表单
##### 通过配置一个json格式的文件，即可以实现一个个性化表单，包括各类型的输入组件、不同的验证规则，各组件之间的逻辑，都可以通过配置的方式去实现
### 登录状态的实现
##### 登录的实现，及登录状态的保存，这里包含前后端代码


