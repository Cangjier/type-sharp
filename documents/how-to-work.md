# How to work
在此介绍一种较为现代的工作方式，work on cloud, enjoy in lifes.

当一项工作开始展开时，一般人的想法是：购买一台工作电脑，配置好环境，开始写代码。这种方式最为直观简单，不过能不能再简单一点呢？

不需要买电脑？这个想法是不是很大胆？[手动狗头]，买个平板怎么样，像写文章一样写代码，闲暇时打一把金铲铲，无聊时追追剧？

也许你要问，都享乐去了，工作呢？还有平板怎么装vscode,nodejs,python呢？还有巨硬的visual studio呢？

别急，别急。

我从口袋里掏出了一个东西，这玩意叫：CodeSpace。只要你的设备能浏览网页，就能写代码！

别急，还有。

git的webhook知道不？你写完代码，push一下，前端直接成可以看的网页了，后端的服务直接部署好了，还有啥？

有些同学是工业软件开发，必须依赖windows，还有巨硬的Visual Studio，默默摇了摇头。

的确，这个稍微难办了点。不过，只要买一台windows服务器，带上webhook，装上需要的环境，不照样能自动化编译部署？

最后，我掏出了一个东西，这个叫：向日葵，实在不行，还有这玩意。

# Try-try
尝试下嘛，很简单的，用github新建一个项目，就能直接用codespace，设置里webhook配置好，enjoy。

# Webhook
可能你对webhook不太会，没事，对于前端项目，你搞个linux服务器，然后执行
```
tscl run register-service demo "tscl run webhook-react-deploy 8080"
```
就自动部署好webhook了，然后把`http://xxx:8080/api/v1/webhook`的url配置到github的webhook里，push一下，前端自动部署好了。

我这里就有一个现成的：`http://124.221.102.24:8080/api/v1/webhook`，push后直接通过`http://124.221.102.24:8080/仓库名称`就能访问。