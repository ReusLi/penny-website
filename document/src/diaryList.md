函数 | 参数 | 返回值 | 注释
:- | :- | :-: | -:
render | - | void | 渲染
getCards | - | Array&lt;any&gt; | 获取卡片list
setActionsShow | hoverKey: number | void | 设置要展示actions的卡片下标鼠标移入卡片时,actions才会展示出来
diarySetting | model: DiaryVO | void | 打开日记设置信息
diaryEdit | model: DiaryVO | void | 编辑日记
diaryDelete | id: string | Promise&lt;boolean&gt; | 删除日记