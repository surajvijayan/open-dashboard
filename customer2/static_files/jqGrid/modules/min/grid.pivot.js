!function(r){"use strict";"function"==typeof define&&define.amd?define(["jquery","./jquery.fmatter","./grid.grouping"],r):"object"==typeof module&&module.exports?module.exports=function(e,t){return e||(e=window),void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(e)),require("./jquery.fmatter"),require("./grid.grouping"),r(t),t}:r(jQuery)}(function(se){"use strict";var ue=se.jgrid;function le(e,t,r){if(!(this instanceof le))return new le(e);this.aggregator=e,this.finilized=!1,this.context=t,this.pivotOptions=r}function fe(e,t,r,o,n){var i,a,s=o.length,u=this,l=function(e,t){var r=e,o=t;if(null==r&&(r=""),null==o&&(o=""),r=String(r),o=String(o),this.caseSensitive||(r=r.toUpperCase(),o=o.toUpperCase()),r===o){if(e===t)return 0;if(void 0===e)return-1;if(void 0===t)return 1;if(null===e)return-1;if(null===t)return 1}return r<o?-1:1},f=function(e,t){return(e=Number(e))===(t=Number(t))?0:e<t?-1:1},g=function(e,t){return(e=Math.floor(Number(e)))===(t=Math.floor(Number(t)))?0:e<t?-1:1};for(u.items=[],u.indexesOfSourceData=[],u.trimByCollect=e,u.caseSensitive=t,u.skipSort=r,u.fieldLength=s,u.fieldNames=new Array(s),u.fieldSortDirection=new Array(s),u.fieldCompare=new Array(s),i=0;i<s;i++){switch(a=o[i],u.fieldNames[i]=a[n||"dataName"],a.sorttype){case"integer":case"int":u.fieldCompare[i]=g;break;case"number":case"currency":case"float":u.fieldCompare[i]=f;break;default:u.fieldCompare[i]=se.isFunction(a.compare)?a.compare:l}u.fieldSortDirection[i]="desc"===a.sortorder?-1:1}}le.prototype.calc=function(e,t,r,o,n){var i=this;if(void 0!==e)switch(i.result=i.result||0,e=parseFloat(e),i.aggregator){case"sum":i.result+=e;break;case"count":i.result++;break;case"avg":i.finilized?(i.count=i.count||0,i.result=(i.result*i.count+e)/(i.count+1)):(i.result+=e,i.count=i.count||0),i.count++;break;case"min":i.result=Math.min(i.result,e);break;case"max":i.result=Math.max(i.result,e);break;default:se.isFunction(i.aggregator)&&(i.result=i.aggregator.call(i.context,{previousResult:i.result,value:e,fieldName:t,item:r,iItem:o,items:n}))}},le.prototype.getResult=function(e,t,r){var o=this;(void 0!==o.result||r)&&(r&&void 0!==o.result&&(o.result=0,o.count=0),void 0===o.result||o.finilized||"avg"!==o.aggregator||(o.result=o.result/o.count,o.finilized=!0),e[t]=o.result)},fe.prototype.compareVectorsEx=function(e,t){var r,o,n=this.fieldLength;for(r=0;r<n;r++)if(0!==(o=this.fieldCompare[r](e[r],t[r])))return{index:r,result:o};return{index:-1,result:0}},fe.prototype.getIndexOfDifferences=function(e,t){return null===t||null===e?0:this.compareVectorsEx(e,t).index},fe.prototype.compareVectors=function(e,t){var r=this.compareVectorsEx(e,t);return 0<(0<=r.index?this.fieldSortDirection[r.index]:1)?r.result:-r.result},fe.prototype.getItem=function(e){return this.items[e]},fe.prototype.getIndexLength=function(){return this.items.length},fe.prototype.getIndexesOfSourceData=function(e){return this.indexesOfSourceData[e]},fe.prototype.createDataIndex=function(e){var t,r,o,n,i,a,s,u,l,f=this,g=e.length,p=f.fieldLength,c=f.fieldNames,m=f.indexesOfSourceData,d=f.items;for(t=0;t<g;t++){for(s=e[t],r=new Array(p),n=0;n<p;n++)void 0!==(o=s[c[n]])&&("string"==typeof o&&f.trimByCollect&&(o=se.trim(o)),r[n]=o);if(u=0,(l=d.length-1)<0)d.push(r),m.push([t]);else if(0!==(i=f.compareVectors(r,d[l])))if(1===i||f.skipSort)d.push(r),m.push([t]);else if(1!==(i=f.compareVectors(d[0],r)))if(0!==i)for(;;){if(l-u<2){d.splice(l,0,r),m.splice(l,0,[t]);break}if(a=Math.floor((u+l)/2),0===(i=f.compareVectors(d[a],r))){m[a].push(t);break}1===i?l=a:u=a}else m[0].push(t);else d.unshift(r),m.unshift([t]);else m[l].push(t)}},ue.extend({pivotSetup:function(f,r){var e,t,o,n,s,i,a,u,l,g,p,c,m,d,y,h,x,v,w,b,S,I,O,C,D,A,T,k,F,N=this[0],R=se.isArray,H={},V={groupField:[],groupSummary:[],groupSummaryPos:[]},j={grouping:!0,groupingView:V},Y=se.extend({totals:!1,useColSpanStyle:!1,trimByCollect:!0,skipSortByX:!1,skipSortByY:!1,caseSensitive:!1,footerTotals:!1,groupSummary:!0,groupSummaryPos:"header",frozenStaticCols:!1,defaultFormatting:!0,data:f},r||{}),B=f.length,q=Y.xDimension,P=Y.yDimension,L=Y.aggregates,z=Y.totalText||Y.totals||Y.rowTotals||Y.totalHeader,M=R(q)?q.length:0,X=R(P)?P.length:0,E=R(L)?L.length:0,G=X-(1===E?1:0),U=[],Q=[],J=[],K=[],W=["pivotInfos"],Z=new Array(E),$=new Array(X),_=function(e,t,r){var o=new fe(Y.trimByCollect,Y.caseSensitive,t,e);return se.isFunction(r)&&(o.compareVectorsEx=r),o.createDataIndex(f),o},ee=function(e,t,r,o,n){var i,a,s;switch(e){case 1:i=P[o].totalText||"{0} {1} {2}",a="y"+n+"t"+o;break;case 2:i=Y.totalText||"{0}",a="t";break;default:i=1<E?t.label||"{0}":se.isFunction(P[o].label)?P[o].label:k.getItem(n)[o],a="y"+n}return delete(s=se.extend({},t,{name:a+(1<E?"a"+r:""),label:se.isFunction(i)?i.call(N,2===e?{aggregate:t,iAggregate:r,pivotOptions:Y}:1===e?{yIndex:k.getItem(n),aggregate:t,iAggregate:r,yLevel:o,pivotOptions:Y}:{yData:k.getItem(n)[o],yIndex:k.getItem(n),yLevel:o,pivotOptions:Y}):ue.template.apply(N,2===e?[String(i),t.aggregator,t.member,r]:[String(i),t.aggregator,t.member,k.getItem(n)[o],o])})).member,delete s.aggregator,s},te=function(e,t,r){var o,n;for(o=0;o<E;o++)void 0===(n=L[o]).template&&void 0===n.formatter&&Y.defaultFormatting&&(n.template="count"===n.aggregator?"integer":"number"),J.push(ee(e,n,o,t,r))},re=function(e,t,r){var o,n,i,a;for(o=G-1;t<=o;o--)if(Q[o]){for(n=0;n<=o;n++)(D=U[n].groupHeaders)[D.length-1].numberOfColumns+=E;for(i=(s=P[o]).totalHeader,a=s.headerOnTop,n=o+1;n<=G-1;n++)U[n].groupHeaders.push({titleText:a&&n===o+1||!a&&n===G-1?se.isFunction(i)?i.call(N,r,o):ue.template.call(N,String(i||""),r[o],o):"",startColumnName:"y"+(e-1)+"t"+o+(1===E?"":"a0"),numberOfColumns:E})}},oe=function(e){var t=new le("count"===L[e].aggregator?"sum":L[e].aggregator,N,r);return t.groupInfo={iRows:[],rows:[],ys:[],iYs:[]},t},ne=function(){var e,t;for(e=G-1;0<=e;e--)if(Q[e])for(null==$[e]&&($[e]=new Array(E)),t=0;t<E;t++)$[e][t]=oe(t)},ie=function(e,t,r,o){var n,i,a,s=k.getIndexOfDifferences(t,r);if(null!==r)for(s=Math.max(s,0),n=G-1;s<=n;n--)i="y"+e+"t"+n+(1<E?"a"+o:""),Q[n]&&void 0===O[i]&&((a=$[n][o]).getResult(O,i),O.pivotInfos[i]={colType:1,iA:o,a:L[o],level:n,iRows:a.groupInfo.iRows,rows:a.groupInfo.rows,ys:a.groupInfo.ys,iYs:a.groupInfo.iYs},t!==r&&($[n][o]=oe(o)))},ae=function(e,t,r,o,n,i,a){var s,u,l;if(e!==t)for(s=G-1;0<=s;s--)Q[s]&&((u=$[s][o]).calc(n[r.member],r.member,n,i,f),l=u.groupInfo,se.inArray(a,l.iYs)<0&&(l.iYs.push(a),l.ys.push(e)),se.inArray(i,l.iRows)<0&&(l.iRows.push(i),l.rows.push(n)))};if(0===M||0===E)throw"xDimension or aggregates options are not set!";for(T=_(q,Y.skipSortByX,Y.compareVectorsByX),k=_(P,Y.skipSortByY,Y.compareVectorsByY),r.xIndex=T,r.yIndex=k,t=0;t<M;t++)i={name:"x"+t,label:null!=(n=q[t]).label?se.isFunction(n.label)?n.label.call(N,n,t,Y):n.label:n.dataName,frozen:Y.frozenStaticCols},t<M-1&&!n.skipGrouping&&!n.additionalProperty&&(V.groupField.push(i.name),V.groupSummary.push(Y.groupSummary),V.groupSummaryPos.push(Y.groupSummaryPos)),delete(i=se.extend(i,n)).dataName,delete i.footerText,n.additionalProperty?W.push(i.name):(J.push(i),j.sortname=i.name);for(M<2&&(j.grouping=!1),V.hideFirstGroupCol=!0,t=0;t<X;t++)s=P[t],Q.push(!!(s.totals||s.rowTotals||s.totalText||s.totalHeader));for(C=k.getItem(0),te(0,X-1,0),F=k.getIndexLength(),v=1;v<F;v++){for(w=k.getItem(v),t=k.getIndexOfDifferences(w,C),o=G-1;t<=o;o--)Q[o]&&te(1,o,v-1);C=w,te(0,X-1,v)}for(t=G-1;0<=t;t--)Q[t]&&te(1,t,F-1);for(z&&te(2),C=k.getItem(0),o=0;o<G;o++)U.push({useColSpanStyle:Y.useColSpanStyle,groupHeaders:[{titleText:se.isFunction(P[o].label)?P[o].label.call(N,{yData:C[o],yIndex:C,yLevel:o,pivotOptions:Y}):C[o],startColumnName:1===E?"y0":"y0a0",numberOfColumns:E}]});for(v=1;v<F;v++){for(w=k.getItem(v),re(v,t=k.getIndexOfDifferences(w,C),C),o=G-1;t<=o;o--)U[o].groupHeaders.push({titleText:se.isFunction(P[o].label)?P[o].label.call(N,{yData:w[o],yIndex:w,yLevel:o,pivotOptions:Y}):w[o],startColumnName:"y"+v+(1===E?"":"a0"),numberOfColumns:E});for(o=0;o<t;o++)(D=U[o].groupHeaders)[D.length-1].numberOfColumns+=E;C=w}if(re(F,0,C),z)for(t=0;t<G;t++)U[t].groupHeaders.push({titleText:t<G-1?"":Y.totalHeader||"",startColumnName:"t"+(1===E?"":"a0"),numberOfColumns:E});for(h=T.getIndexLength(),l=0;l<h;l++){for(g=T.getItem(l),O={pivotInfos:p={iX:l,x:g}},t=0;t<M;t++)O["x"+t]=g[t];if(x=T.getIndexesOfSourceData(l),z)for(o=0;o<E;o++)Z[o]=oe(o);for(C=null,ne(),v=0;v<F;v++){for(w=k.getItem(v),b=k.getIndexesOfSourceData(v),o=0;o<E;o++){for(null!==C&&ie(v-1,w,C,o),S=[],t=0;t<b.length;t++)A=b[t],0<=se.inArray(A,x)&&S.push(A);if(0<S.length){for(c=new Array(S.length),m=new le((I=L[o]).aggregator,N,r),a=0;a<S.length;a++)t=S[a],e=f[t],c[a]=e,m.calc(e[I.member],I.member,e,t,f),z&&((d=Z[o]).calc(e[I.member],I.member,e,t,f),y=d.groupInfo,se.inArray(t,y.iYs)<0&&(y.iYs.push(v),y.ys.push(w)),se.inArray(t,y.iRows)<0&&(y.iRows.push(t),y.rows.push(e))),ae(w,C,I,o,e,t,v);u="y"+v+(1===E?"":"a"+o),m.getResult(O,u),p[u]={colType:0,iY:v,y:w,iA:o,a:I,iRows:S,rows:c}}}C=w}if(null!==C)for(o=0;o<E;o++)ie(F-1,C,C,o);if(z)for(o=0;o<E;o++)u="t"+(1===E?"":"a"+o),(d=Z[o]).getResult(O,u),y=d.groupInfo,p[u]={colType:2,iA:o,a:L[o],iRows:y.iRows,rows:y.rows,iYs:y.iYs,ys:y.ys};K.push(O)}if(Y.footerTotals||Y.colTotals){for(B=K.length,t=0;t<M;t++)H["x"+t]=q[t].footerText||"";for(t=M;t<J.length;t++){for(u=J[t].name,m=new le(Y.footerAggregator||"sum",N,r),a=0;a<B;a++)O=K[a],m.calc(O[u],u,O,a,K);m.getResult(H,u)}}return r.colHeaders=U,{colModel:J,additionalProperties:W,options:r,rows:K,groupOptions:j,groupHeaders:U,summary:H}},jqPivot:function(l,f,g,r){return this.each(function(){var a=this,s=se(a),u=se.fn.jqGrid;function t(){var e,t=u.pivotSetup.call(s,l,f),r=t.groupHeaders,o=0<function(e){var t,r=0;for(t in e)e.hasOwnProperty(t)&&r++;return r}(t.summary),n=t.groupOptions.groupingView,i=ue.from.call(a,t.rows);if(!f.skipSortByX)for(e=0;e<n.groupField.length;e++)i.orderBy(n.groupField[e],null!=g&&g.groupingView&&null!=g.groupingView.groupOrder&&"desc"===g.groupingView.groupOrder[e]?"d":"a","text","");if(f.data=l,u.call(s,se.extend(!0,{datastr:se.extend(i.select(),o?{userdata:t.summary}:{}),datatype:"jsonstring",footerrow:o,userDataOnFooter:o,colModel:t.colModel,additionalProperties:t.additionalProperties,pivotOptions:t.options,viewrecords:!0,sortname:f.xDimension[0].dataName},t.groupOptions,g||{})),r.length)for(e=0;e<r.length;e++)r[e]&&r[e].groupHeaders.length&&u.setGroupHeaders.call(s,r[e]);f.frozenStaticCols&&u.setFrozenColumns.call(s)}"string"==typeof l?se.ajax(se.extend({url:l,dataType:"json",success:function(e){l=ue.getAccessor(e,r&&r.reader?r.reader:"rows"),t()}},r||{})):t()})}})});
//# sourceMappingURL=grid.pivot.js.map