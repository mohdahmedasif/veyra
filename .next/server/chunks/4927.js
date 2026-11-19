"use strict";exports.id=4927,exports.ids=[4927],exports.modules={4927:(a,b,c)=>{let d;c.r(b),c.d(b,{InferenceSession:()=>I,TRACE:()=>D,TRACE_FUNC_BEGIN:()=>F,TRACE_FUNC_END:()=>G,Tensor:()=>C,default:()=>g1,env:()=>m,registerBackend:()=>g});var e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J=Object.defineProperty,K=Object.getOwnPropertyDescriptor,L=Object.getOwnPropertyNames,M=Object.prototype.hasOwnProperty,N=(d=function(a){if("u">typeof require)return require.apply(this,arguments);throw Error('Dynamic require of "'+a+'" is not supported')},"u">typeof require?require:"u">typeof Proxy?new Proxy(d,{get:(a,b)=>("u">typeof require?require:a)[b]}):d),O=(a,b)=>()=>(a&&(b=a(a=0)),b),P=(a,b)=>{for(var c in b)J(a,c,{get:b[c],enumerable:!0})},Q=a=>((a,b,c)=>{if(b&&"object"==typeof b||"function"==typeof b)for(let d of L(b))M.call(a,d)||void 0===d||J(a,d,{get:()=>b[d],enumerable:!(c=K(b,d))||c.enumerable});return a})(J({},"__esModule",{value:!0}),a),R=O(()=>{e=new Map,f=[],g=(a,b,c)=>{if(b&&"function"==typeof b.init&&"function"==typeof b.createInferenceSessionHandler){let d=e.get(a);if(void 0===d)e.set(a,{backend:b,priority:c});else{if(d.priority>c)return;if(d.priority===c&&d.backend!==b)throw Error(`cannot register backend "${a}" using priority ${c}`)}if(c>=0){let b=f.indexOf(a);-1!==b&&f.splice(b,1);for(let b=0;b<f.length;b++)if(e.get(f[b]).priority<=c)return void f.splice(b,0,a);f.push(a)}return}throw TypeError("not a valid backend")},h=async a=>{let b=e.get(a);if(!b)return"backend not found.";if(b.initialized)return b.backend;if(b.aborted)return b.error;{let c=!!b.initPromise;try{return c||(b.initPromise=b.backend.init(a)),await b.initPromise,b.initialized=!0,b.backend}catch(a){return c||(b.error=`${a}`,b.aborted=!0),b.error}finally{delete b.initPromise}}},i=async a=>{let b=a.executionProviders||[],c=b.map(a=>"string"==typeof a?a:a.name),d=0===c.length?f:c,e,g=[],i=new Set;for(let a of d){let b=await h(a);"string"==typeof b?g.push({name:a,err:b}):(e||(e=b),e===b&&i.add(a))}if(!e)throw Error(`no available backend found. ERR: ${g.map(a=>`[${a.name}] ${a.err}`).join(", ")}`);for(let{name:a,err:b}of g)c.includes(a)&&console.warn(`removing requested execution provider "${a}" from session options because it is not available: ${b}`);let j=b.filter(a=>i.has("string"==typeof a?a:a.name));return[e,new Proxy(a,{get:(a,b)=>"executionProviders"===b?j:Reflect.get(a,b)})]}}),S=O(()=>{R()}),T=O(()=>{j="1.21.0"}),U=O(()=>{T(),k="warning",Object.defineProperty(l={wasm:{},webgl:{},webgpu:{},versions:{common:j},set logLevel(a){if(void 0!==a){if("string"!=typeof a||-1===["verbose","info","warning","error","fatal"].indexOf(a))throw Error(`Unsupported logging level: ${a}`);k=a}},get logLevel(){return k}},"logLevel",{enumerable:!0})}),V=O(()=>{U(),m=l}),W=O(()=>{n=(a,b)=>{let c="u">typeof document?document.createElement("canvas"):new OffscreenCanvas(1,1);c.width=a.dims[3],c.height=a.dims[2];let d=c.getContext("2d");if(null!=d){let e,f;b?.tensorLayout!==void 0&&"NHWC"===b.tensorLayout?(e=a.dims[2],f=a.dims[3]):(e=a.dims[3],f=a.dims[2]);let g=b?.format!==void 0?b.format:"RGB",h=b?.norm,i,j;void 0===h||void 0===h.mean?i=[255,255,255,255]:"number"==typeof h.mean?i=[h.mean,h.mean,h.mean,h.mean]:(i=[h.mean[0],h.mean[1],h.mean[2],0],void 0!==h.mean[3]&&(i[3]=h.mean[3])),void 0===h||void 0===h.bias?j=[0,0,0,0]:"number"==typeof h.bias?j=[h.bias,h.bias,h.bias,h.bias]:(j=[h.bias[0],h.bias[1],h.bias[2],0],void 0!==h.bias[3]&&(j[3]=h.bias[3]));let k=f*e,l=0,m=k,n=2*k,o=-1;"RGBA"===g?(l=0,m=k,n=2*k,o=3*k):"RGB"===g?(l=0,m=k,n=2*k):"RBG"===g&&(l=0,n=k,m=2*k);for(let b=0;b<f;b++)for(let c=0;c<e;c++)d.fillStyle="rgba("+(a.data[l++]-j[0])*i[0]+","+(a.data[m++]-j[1])*i[1]+","+(a.data[n++]-j[2])*i[2]+","+(-1===o?255:(a.data[o++]-j[3])*i[3])+")",d.fillRect(c,b,1,1);if("toDataURL"in c)return c.toDataURL();throw Error("toDataURL is not supported")}throw Error("Can not access image data")},o=(a,b)=>{let c="u">typeof document?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),d;if(null!=c){let e,f,g;b?.tensorLayout!==void 0&&"NHWC"===b.tensorLayout?(e=a.dims[2],f=a.dims[1],g=a.dims[3]):(e=a.dims[3],f=a.dims[2],g=a.dims[1]);let h=void 0!==b&&void 0!==b.format?b.format:"RGB",i=b?.norm,j,k;void 0===i||void 0===i.mean?j=[255,255,255,255]:"number"==typeof i.mean?j=[i.mean,i.mean,i.mean,i.mean]:(j=[i.mean[0],i.mean[1],i.mean[2],255],void 0!==i.mean[3]&&(j[3]=i.mean[3])),void 0===i||void 0===i.bias?k=[0,0,0,0]:"number"==typeof i.bias?k=[i.bias,i.bias,i.bias,i.bias]:(k=[i.bias[0],i.bias[1],i.bias[2],0],void 0!==i.bias[3]&&(k[3]=i.bias[3]));let l=f*e;if(void 0!==b&&(void 0!==b.format&&4===g&&"RGBA"!==b.format||3===g&&"RGB"!==b.format&&"BGR"!==b.format))throw Error("Tensor format doesn't match input tensor dims");let m=0,n=1,o=2,p=3,q=0,r=l,s=2*l,t=-1;"RGBA"===h?(q=0,r=l,s=2*l,t=3*l):"RGB"===h?(q=0,r=l,s=2*l):"RBG"===h&&(q=0,s=l,r=2*l),d=c.createImageData(e,f);for(let b=0;b<f*e;m+=4,n+=4,o+=4,p+=4,b++)d.data[m]=(a.data[q++]-k[0])*j[0],d.data[n]=(a.data[r++]-k[1])*j[1],d.data[o]=(a.data[s++]-k[2])*j[2],d.data[p]=-1===t?255:(a.data[t++]-k[3])*j[3]}else throw Error("Can not access image data");return d}}),X=O(()=>{$(),p=(a,b)=>{if(void 0===a)throw Error("Image buffer must be defined");if(void 0===b.height||void 0===b.width)throw Error("Image height and width must be defined");if("NHWC"===b.tensorLayout)throw Error("NHWC Tensor layout is not supported yet");let{height:c,width:d}=b,e=b.norm??{mean:255,bias:0},f,g;f="number"==typeof e.mean?[e.mean,e.mean,e.mean,e.mean]:[e.mean[0],e.mean[1],e.mean[2],e.mean[3]??255],g="number"==typeof e.bias?[e.bias,e.bias,e.bias,e.bias]:[e.bias[0],e.bias[1],e.bias[2],e.bias[3]??0];let h=void 0!==b.format?b.format:"RGBA",i=void 0!==b.tensorFormat&&void 0!==b.tensorFormat?b.tensorFormat:"RGB",j=c*d,k=new Float32Array("RGBA"===i?4*j:3*j),l=4,m=0,n=1,o=2,p=3,q=0,r=j,s=2*j,t=-1;"RGB"===h&&(l=3,m=0,n=1,o=2,p=-1),"RGBA"===i?t=3*j:"RBG"===i?(q=0,s=j,r=2*j):"BGR"===i&&(s=0,r=j,q=2*j);for(let b=0;b<j;b++,m+=l,o+=l,n+=l,p+=l)k[q++]=(a[m]+g[0])/f[0],k[r++]=(a[n]+g[1])/f[1],k[s++]=(a[o]+g[2])/f[2],-1!==t&&-1!==p&&(k[t++]=(a[p]+g[3])/f[3]);return"RGBA"===i?new B("float32",k,[1,4,c,d]):new B("float32",k,[1,3,c,d])},q=async(a,b)=>{let c="u">typeof HTMLImageElement&&a instanceof HTMLImageElement,d="u">typeof ImageData&&a instanceof ImageData,e="u">typeof ImageBitmap&&a instanceof ImageBitmap,f="string"==typeof a,g,h=b??{},i=()=>{if("u">typeof document)return document.createElement("canvas");if("u">typeof OffscreenCanvas)return new OffscreenCanvas(1,1);throw Error("Canvas is not supported")},j=a=>"u">typeof HTMLCanvasElement&&a instanceof HTMLCanvasElement||a instanceof OffscreenCanvas?a.getContext("2d"):null;if(c){let c=i();c.width=a.width,c.height=a.height;let d=j(c);if(null!=d){let c=a.height,e=a.width;if(void 0!==b&&void 0!==b.resizedHeight&&void 0!==b.resizedWidth&&(c=b.resizedHeight,e=b.resizedWidth),void 0!==b){if(h=b,void 0!==b.tensorFormat)throw Error("Image input config format must be RGBA for HTMLImageElement");h.tensorFormat="RGBA",h.height=c,h.width=e}else h.tensorFormat="RGBA",h.height=c,h.width=e;d.drawImage(a,0,0),g=d.getImageData(0,0,e,c).data}else throw Error("Can not access image data")}else if(d){let c,d;if(void 0!==b&&void 0!==b.resizedWidth&&void 0!==b.resizedHeight?(c=b.resizedHeight,d=b.resizedWidth):(c=a.height,d=a.width),void 0!==b&&(h=b),h.format="RGBA",h.height=c,h.width=d,void 0!==b){let b=i();b.width=d,b.height=c;let e=j(b);if(null!=e)e.putImageData(a,0,0),g=e.getImageData(0,0,d,c).data;else throw Error("Can not access image data")}else g=a.data}else if(e){if(void 0===b)throw Error("Please provide image config with format for Imagebitmap");let c=i();c.width=a.width,c.height=a.height;let d=j(c);if(null!=d){let b=a.height,c=a.width;return d.drawImage(a,0,0,c,b),g=d.getImageData(0,0,c,b).data,h.height=b,h.width=c,p(g,h)}throw Error("Can not access image data")}else{if(f)return new Promise((b,c)=>{let d=i(),e=j(d);if(!a||!e)return c();let f=new Image;f.crossOrigin="Anonymous",f.src=a,f.onload=()=>{d.width=f.width,d.height=f.height,e.drawImage(f,0,0,d.width,d.height);let a=e.getImageData(0,0,d.width,d.height);h.height=d.height,h.width=d.width,b(p(a.data,h))}});throw Error("Input data provided is not supported - aborted tensor creation")}if(void 0!==g)return p(g,h);throw Error("Input data provided is not supported - aborted tensor creation")},r=(a,b)=>{let{width:c,height:d,download:e,dispose:f}=b;return new B({location:"texture",type:"float32",texture:a,dims:[1,d,c,4],download:e,dispose:f})},s=(a,b)=>{let{dataType:c,dims:d,download:e,dispose:f}=b;return new B({location:"gpu-buffer",type:c??"float32",gpuBuffer:a,dims:d,download:e,dispose:f})},t=(a,b)=>{let{dataType:c,dims:d,download:e,dispose:f}=b;return new B({location:"ml-tensor",type:c??"float32",mlTensor:a,dims:d,download:e,dispose:f})},u=(a,b,c)=>new B({location:"cpu-pinned",type:a,data:b,dims:c??[b.length]})}),Y=O(()=>{v=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),w=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),x=!1,y=()=>{if(!x){x=!0;let a="u">typeof BigInt64Array&&BigInt64Array.from,b="u">typeof BigUint64Array&&BigUint64Array.from,c=globalThis.Float16Array,d="u">typeof c&&c.from;a&&(v.set("int64",BigInt64Array),w.set(BigInt64Array,"int64")),b&&(v.set("uint64",BigUint64Array),w.set(BigUint64Array,"uint64")),d?(v.set("float16",c),w.set(c,"float16")):v.set("float16",Uint16Array)}}}),Z=O(()=>{$(),z=a=>{let b=1;for(let c=0;c<a.length;c++){let d=a[c];if("number"!=typeof d||!Number.isSafeInteger(d))throw TypeError(`dims[${c}] must be an integer, got: ${d}`);if(d<0)throw RangeError(`dims[${c}] must be a non-negative integer, got: ${d}`);b*=d}return b},A=(a,b)=>{switch(a.location){case"cpu":return new B(a.type,a.data,b);case"cpu-pinned":return new B({location:"cpu-pinned",data:a.data,type:a.type,dims:b});case"texture":return new B({location:"texture",texture:a.texture,type:a.type,dims:b});case"gpu-buffer":return new B({location:"gpu-buffer",gpuBuffer:a.gpuBuffer,type:a.type,dims:b});case"ml-tensor":return new B({location:"ml-tensor",mlTensor:a.mlTensor,type:a.type,dims:b});default:throw Error(`tensorReshape: tensor location ${a.location} is not supported`)}}}),$=O(()=>{W(),X(),Y(),Z(),B=class{constructor(a,b,c){let d,e;if(y(),"object"==typeof a&&"location"in a)switch(this.dataLocation=a.location,d=a.type,e=a.dims,a.location){case"cpu-pinned":{let b=v.get(d);if(!b)throw TypeError(`unsupported type "${d}" to create tensor from pinned buffer`);if(!(a.data instanceof b))throw TypeError(`buffer should be of type ${b.name}`);this.cpuData=a.data;break}case"texture":if("float32"!==d)throw TypeError(`unsupported type "${d}" to create tensor from texture`);this.gpuTextureData=a.texture,this.downloader=a.download,this.disposer=a.dispose;break;case"gpu-buffer":if("float32"!==d&&"float16"!==d&&"int32"!==d&&"int64"!==d&&"uint32"!==d&&"uint8"!==d&&"bool"!==d&&"uint4"!==d&&"int4"!==d)throw TypeError(`unsupported type "${d}" to create tensor from gpu buffer`);this.gpuBufferData=a.gpuBuffer,this.downloader=a.download,this.disposer=a.dispose;break;case"ml-tensor":if("float32"!==d&&"float16"!==d&&"int32"!==d&&"int64"!==d&&"uint32"!==d&&"uint64"!==d&&"int8"!==d&&"uint8"!==d&&"bool"!==d&&"uint4"!==d&&"int4"!==d)throw TypeError(`unsupported type "${d}" to create tensor from MLTensor`);this.mlTensorData=a.mlTensor,this.downloader=a.download,this.disposer=a.dispose;break;default:throw Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let f,g;if("string"==typeof a)if(d=a,g=c,"string"===a){if(!Array.isArray(b))throw TypeError("A string tensor's data must be a string array.");f=b}else{let c=v.get(a);if(void 0===c)throw TypeError(`Unsupported tensor type: ${a}.`);if(Array.isArray(b)){if("float16"===a&&c===Uint16Array||"uint4"===a||"int4"===a)throw TypeError(`Creating a ${a} tensor from number array is not supported. Please use ${c.name} as data.`);f="uint64"===a||"int64"===a?c.from(b,BigInt):c.from(b)}else if(b instanceof c)f=b;else if(b instanceof Uint8ClampedArray)if("uint8"===a)f=Uint8Array.from(b);else throw TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if("float16"===a&&b instanceof Uint16Array&&c!==Uint16Array)f=new globalThis.Float16Array(b.buffer,b.byteOffset,b.length);else throw TypeError(`A ${d} tensor's data must be type of ${c}`)}else if(g=b,Array.isArray(a)){if(0===a.length)throw TypeError("Tensor type cannot be inferred from an empty array.");let b=typeof a[0];if("string"===b)d="string",f=a;else if("boolean"===b)d="bool",f=Uint8Array.from(a);else throw TypeError(`Invalid element type of data array: ${b}.`)}else if(a instanceof Uint8ClampedArray)d="uint8",f=Uint8Array.from(a);else{let b=w.get(a.constructor);if(void 0===b)throw TypeError(`Unsupported type for tensor data: ${a.constructor}.`);d=b,f=a}if(void 0===g)g=[f.length];else if(!Array.isArray(g))throw TypeError("A tensor's dims must be a number array");e=g,this.cpuData=f,this.dataLocation="cpu"}let f=z(e);if(this.cpuData&&f!==this.cpuData.length&&("uint4"!==d&&"int4"!==d||Math.ceil(f/2)!==this.cpuData.length))throw Error(`Tensor's size(${f}) does not match data length(${this.cpuData.length}).`);this.type=d,this.dims=e,this.size=f}static async fromImage(a,b){return q(a,b)}static fromTexture(a,b){return r(a,b)}static fromGpuBuffer(a,b){return s(a,b)}static fromMLTensor(a,b){return t(a,b)}static fromPinnedBuffer(a,b,c){return u(a,b,c)}toDataURL(a){return n(this,a)}toImageData(a){return o(this,a)}get data(){if(this.ensureValid(),!this.cpuData)throw Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(a){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":if(!this.downloader)throw Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let b=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=b,a&&this.disposer&&(this.disposer(),this.disposer=void 0),b}finally{this.isDownloading=!1}default:throw Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if("none"===this.dataLocation)throw Error("The tensor is disposed.")}reshape(a){if(this.ensureValid(),this.downloader||this.disposer)throw Error("Cannot reshape a tensor that owns GPU resource.");return A(this,a)}}}),_=O(()=>{$(),C=B}),aa=O(()=>{U(),D=(a,b)=>{(typeof l.trace>"u"?l.wasm.trace:l.trace)&&console.timeStamp(`${a}::ORT::${b}`)},E=(a,b)=>{let c=Error().stack?.split(/\r\n|\r|\n/g)||[],d=!1;for(let e=0;e<c.length;e++){if(d&&!c[e].includes("TRACE_FUNC")){let d=`FUNC_${a}::${c[e].trim().split(" ")[1]}`;b&&(d+=`::${b}`),D("CPU",d);return}c[e].includes("TRACE_FUNC")&&(d=!0)}},F=a=>{(typeof l.trace>"u"?l.wasm.trace:l.trace)&&E("BEGIN",a)},G=a=>{(typeof l.trace>"u"?l.wasm.trace:l.trace)&&E("END",a)}}),ab=O(()=>{R(),_(),aa(),H=class a{constructor(a){this.handler=a}async run(a,b,c){F();let d={},e={};if("object"!=typeof a||null===a||a instanceof C||Array.isArray(a))throw TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let f=!0;if("object"==typeof b){if(null===b)throw TypeError("Unexpected argument[1]: cannot be null.");if(b instanceof C)throw TypeError("'fetches' cannot be a Tensor");if(Array.isArray(b)){if(0===b.length)throw TypeError("'fetches' cannot be an empty array.");for(let a of(f=!1,b)){if("string"!=typeof a)throw TypeError("'fetches' must be a string array or an object.");if(-1===this.outputNames.indexOf(a))throw RangeError(`'fetches' contains invalid output name: ${a}.`);d[a]=null}if("object"==typeof c&&null!==c)e=c;else if("u">typeof c)throw TypeError("'options' must be an object.")}else{let a=!1,g=Object.getOwnPropertyNames(b);for(let c of this.outputNames)if(-1!==g.indexOf(c)){let e=b[c];(null===e||e instanceof C)&&(a=!0,f=!1,d[c]=e)}if(a){if("object"==typeof c&&null!==c)e=c;else if("u">typeof c)throw TypeError("'options' must be an object.")}else e=b}}else if("u">typeof b)throw TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let b of this.inputNames)if(typeof a[b]>"u")throw Error(`input '${b}' is missing in 'feeds'.`);if(f)for(let a of this.outputNames)d[a]=null;let g=await this.handler.run(a,d,e),h={};for(let a in g)if(Object.hasOwnProperty.call(g,a)){let b=g[a];b instanceof C?h[a]=b:h[a]=new C(b.type,b.data,b.dims)}return G(),h}async release(){return this.handler.dispose()}static async create(b,c,d,e){F();let f,g={};if("string"==typeof b){if(f=b,"object"==typeof c&&null!==c)g=c;else if("u">typeof c)throw TypeError("'options' must be an object.")}else if(b instanceof Uint8Array){if(f=b,"object"==typeof c&&null!==c)g=c;else if("u">typeof c)throw TypeError("'options' must be an object.")}else if(b instanceof ArrayBuffer||"u">typeof SharedArrayBuffer&&b instanceof SharedArrayBuffer){let a=0,h=b.byteLength;if("object"==typeof c&&null!==c)g=c;else if("number"==typeof c){if(!Number.isSafeInteger(a=c))throw RangeError("'byteOffset' must be an integer.");if(a<0||a>=b.byteLength)throw RangeError(`'byteOffset' is out of range [0, ${b.byteLength}).`);if(h=b.byteLength-a,"number"==typeof d){if(!Number.isSafeInteger(h=d))throw RangeError("'byteLength' must be an integer.");if(h<=0||a+h>b.byteLength)throw RangeError(`'byteLength' is out of range (0, ${b.byteLength-a}].`);if("object"==typeof e&&null!==e)g=e;else if("u">typeof e)throw TypeError("'options' must be an object.")}else if("u">typeof d)throw TypeError("'byteLength' must be a number.")}else if("u">typeof c)throw TypeError("'options' must be an object.");f=new Uint8Array(b,a,h)}else throw TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[h,j]=await i(g),k=await h.createInferenceSessionHandler(f,j);return G(),new a(k)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}}),ac=O(()=>{ab(),I=H}),ad=O(()=>{}),ae=O(()=>{}),af=O(()=>{}),ag=O(()=>{}),ah={};P(ah,{InferenceSession:()=>I,TRACE:()=>D,TRACE_FUNC_BEGIN:()=>F,TRACE_FUNC_END:()=>G,Tensor:()=>C,env:()=>m,registerBackend:()=>g});var ai=O(()=>{S(),V(),ac(),_(),ad(),ae(),aa(),af(),ag()}),aj=O(()=>{}),ak={};P(ak,{default:()=>am});var al,am,an=O(()=>{gV(),ff(),fe(),(al=globalThis.self?.name==="ort-wasm-proxy-worker")&&(self.onmessage=a=>{let{type:b,in:c}=a.data;try{switch(b){case"init-wasm":aF(c.wasm).then(()=>{gp(c).then(()=>{postMessage({type:b})},a=>{postMessage({type:b,err:a})})},a=>{postMessage({type:b,err:a})});break;case"init-ep":{let{epName:a,env:d}=c;gq(d,a).then(()=>{postMessage({type:b})},a=>{postMessage({type:b,err:a})});break}case"copy-from":{let{buffer:a}=c,d=gs(a);postMessage({type:b,out:d});break}case"create":{let{model:a,options:d}=c;gt(a,d).then(a=>{postMessage({type:b,out:a})},a=>{postMessage({type:b,err:a})});break}case"release":gu(c),postMessage({type:b});break;case"run":{let{sessionId:a,inputIndices:d,inputs:e,outputIndices:f,options:g}=c;gw(a,d,e,f,Array(f.length).fill(null),g).then(a=>{a.some(a=>"cpu"!==a[3])?postMessage({type:b,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:b,out:a},gy([...e,...a]))},a=>{postMessage({type:b,err:a})});break}case"end-profiling":gx(c),postMessage({type:b})}}catch(a){postMessage({type:b,err:a})}}),am=al?null:a=>new Worker(a??as,{type:"module",name:"ort-wasm-proxy-worker"})}),ao={};P(ao,{default:()=>aq});var ap,aq,ar,as,at,au,av,aw,ax,ay,az,aA,aB,aC,aD,aE,aF,aG,aH,aI,aJ,aK,aL,aM,aN,aO,aP,aQ,aR,aS,aT,aU,aV,aW,aX,aY,aZ,a$,a_,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,ba,bb,bc,bd,be,bf,bg,bh,bi,bj,bk,bl,bm,bn,bo,bp,bq,br,bs,bt,bu,bv,bw,bx,by,bz,bA,bB,bC,bD,bE,bF,bG,bH,bI,bJ,bK,bL,bM,bN,bO,bP,bQ,bR,bS,bT,bU,bV,bW,bX,bY,bZ,b$,b_,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,ca,cb,cc,cd,ce,cf,cg,ch,ci,cj,ck,cl,cm,cn,co,cp,cq,cr,cs,ct,cu,cv,cw,cx,cy,cz,cA,cB,cC,cD,cE,cF,cG,cH,cI,cJ,cK,cL,cM,cN,cO,cP,cQ,cR,cS,cT,cU,cV,cW,cX,cY,cZ,c$,c_,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,da,db,dc,dd,de,df,dg,dh,di,dj,dk,dl,dm,dn,dp,dq,dr,ds,dt,du,dv,dw,dx,dy,dz,dA,dB,dC,dD,dE,dF,dG,dH,dI,dJ,dK,dL,dM,dN,dO,dP,dQ,dR,dS,dT,dU,dV,dW,dX,dY,dZ,d$,d_,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,ea,eb,ec,ed,ee,ef,eg,eh,ei,ej,ek,el,em,en,eo,ep,eq,er,es,et,eu,ev,ew,ex,ey,ez,eA,eB,eC,eD,eE,eF,eG,eH,eI,eJ,eK,eL,eM,eN,eO,eP,eQ,eR,eS,eT,eU,eV,eW,eX,eY,eZ,e$,e_,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,fa,fb,fc,fd=O(()=>{aq=ap=async function(a={}){var b,c,d=new Promise((a,d)=>{b=a,c=d}),e="object"==typeof window,f="u">typeof WorkerGlobalScope,g=f&&self.name?.startsWith("em-pthread");a.mountExternalData=(b,c)=>{b.startsWith("./")&&(b=b.substring(2)),(a.Bd||(a.Bd=new Map)).set(b,c)},a.unmountExternalData=()=>{delete a.Bd};var h=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let i=()=>{let b=(a,b,c)=>(...d)=>{let e=bL,f=b?.();d=a(...d);let g=b?.();return f!==g&&(a=g,c(f),b=c=null),bL!=e?new Promise((a,b)=>{bR={resolve:a,reject:b}}):d},c=b=>async(...c)=>{try{if(a.Cd)throw Error("Session already started");let d=a.Cd={be:c[0],errors:[]},e=await b(...c);if(a.Cd!==d)throw Error("Session mismatch");a.Dd?.flush();let f=d.errors;if(0<f.length){let a=await Promise.all(f);if(a=a.filter(a=>a),0<a.length)throw Error(a.join(`
`))}return e}finally{a.Cd=null}};a._OrtCreateSession=b(a._OrtCreateSession,()=>a._OrtCreateSession,b=>a._OrtCreateSession=b),a._OrtRun=c(b(a._OrtRun,()=>a._OrtRun,b=>a._OrtRun=b)),a._OrtRunWithBinding=c(b(a._OrtRunWithBinding,()=>a._OrtRunWithBinding,b=>a._OrtRunWithBinding=b)),a._OrtBindInput=b(a._OrtBindInput,()=>a._OrtBindInput,b=>a._OrtBindInput=b),i=void 0};a.jsepInit=(b,c)=>{if(i?.(),"webgpu"===b){[a.Dd,a.Rd,a.Vd,a.Hd,a.Ud,a.hc,a.Wd,a.Zd,a.Sd,a.Td,a.Xd]=c;let b=a.Dd;a.jsepRegisterBuffer=(a,c,d,e)=>b.registerBuffer(a,c,d,e),a.jsepGetBuffer=a=>b.getBuffer(a),a.jsepCreateDownloader=(a,c,d)=>b.createDownloader(a,c,d),a.jsepOnCreateSession=a=>{b.onCreateSession(a)},a.jsepOnReleaseSession=a=>{b.onReleaseSession(a)},a.jsepOnRunStart=a=>b.onRunStart(a),a.$d=(a,c)=>{b.upload(a,c)}}else if("webnn"===b){[a.Dd,a.Yd,a.Id,a.jsepEnsureTensor,a.Jd,a.jsepDownloadTensor]=c,a.jsepReleaseTensorId=a.Id,a.jsepUploadTensor=a.Jd;let b=a.Dd;a.jsepOnRunStart=a=>b.onRunStart(a),a.jsepOnRunEnd=b.onRunEnd.bind(b),a.jsepRegisterMLContext=(a,c)=>{b.registerMLContext(a,c)},a.jsepOnReleaseSession=a=>{b.onReleaseSession(a)},a.jsepCreateMLTensorDownloader=(a,c)=>b.createMLTensorDownloader(a,c),a.jsepRegisterMLTensor=(a,c,d,e)=>b.registerMLTensor(a,c,d,e),a.jsepCreateMLContext=a=>b.createMLContext(a),a.jsepRegisterMLConstant=(c,d,e,f,g)=>b.registerMLConstant(c,d,e,f,g,a.Bd),a.jsepRegisterGraphInput=b.registerGraphInput.bind(b),a.jsepIsGraphInput=b.isGraphInput.bind(b),a.jsepCreateTemporaryTensor=b.createTemporaryTensor.bind(b)}};var j,k,l=Object.assign({},a),m=(a,b)=>{throw b},n="";(e||f)&&(f?n=self.location.href:"u">typeof document&&document.currentScript&&(n=document.currentScript.src),n=(n="file:///home/runner/work/veyra/veyra/src/node_modules/onnxruntime-web/dist/ort.webgpu.bundle.min.mjs").startsWith("blob:")?"":n.slice(0,n.replace(/[?#].*/,"").lastIndexOf("/")+1),f&&(k=a=>{var b=new XMLHttpRequest;return b.open("GET",a,!1),b.responseType="arraybuffer",b.send(null),new Uint8Array(b.response)}),j=async a=>{if(H(a))return new Promise((b,c)=>{var d=new XMLHttpRequest;d.open("GET",a,!0),d.responseType="arraybuffer",d.onload=()=>{200==d.status||0==d.status&&d.response?b(d.response):c(d.status)},d.onerror=c,d.send(null)});var b=await fetch(a,{credentials:"same-origin"});if(b.ok)return b.arrayBuffer();throw Error(b.status+" : "+b.url)});var o=console.log.bind(console),p=console.error.bind(console),q=o,r=p;Object.assign(a,l),l=null;var s,t,u,v,w,x,y,z,A,B,C,D,E,F=a.wasmBinary,G=!1,H=a=>a.startsWith("file://");function I(){return s.buffer!=v.buffer&&S(),v}function J(){return s.buffer!=v.buffer&&S(),w}function K(){return s.buffer!=v.buffer&&S(),x}function L(){return s.buffer!=v.buffer&&S(),y}function M(){return s.buffer!=v.buffer&&S(),z}function N(){return s.buffer!=v.buffer&&S(),A}function O(){return s.buffer!=v.buffer&&S(),B}function P(){return s.buffer!=v.buffer&&S(),E}if(g){let b=function(c){try{var d=c.data,e=d.yd;if("load"===e){let c=[];for(let e of(self.onmessage=a=>c.push(a),self.startWorker=()=>{for(let a of(postMessage({yd:"loaded"}),c))b(a);self.onmessage=b},d.Od))a[e]&&!a[e].proxy||(a[e]=(...a)=>{postMessage({yd:"callHandler",Nd:e,args:a})},"print"==e&&(q=a[e]),"printErr"==e&&(r=a[e]));s=d.he,S(),Q(d.ie)}else if("run"===e){as(d.xd),c$(d.xd,0,0,1,0,0),ap(),bx(d.xd),R||(cW(),R=!0);try{at(d.de,d.Fd)}catch(a){if("unwind"!=a)throw a}}else"setimmediate"!==d.target&&("checkMailbox"===e?R&&by():e&&(r(`worker: received unknown command ${e}`),r(d)))}catch(a){throw c_(),a}};var Q,R=!1;r=function(...a){console.error(a=a.join(" "))},self.alert=function(...a){postMessage({yd:"alert",text:a.join(" "),fe:cX()})},self.onunhandledrejection=a=>{throw a.reason||a},self.onmessage=b}function S(){var b=s.buffer;a.HEAP8=v=new Int8Array(b),a.HEAP16=x=new Int16Array(b),a.HEAPU8=w=new Uint8Array(b),a.HEAPU16=y=new Uint16Array(b),a.HEAP32=z=new Int32Array(b),a.HEAPU32=A=new Uint32Array(b),a.HEAPF32=B=new Float32Array(b),a.HEAPF64=E=new Float64Array(b),a.HEAP64=C=new BigInt64Array(b),a.HEAPU64=D=new BigUint64Array(b)}function T(){g?startWorker(a):cT.Bb()}g||(s=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),S());var U,V=0,W=null;function X(){if(0==--V&&W){var a=W;W=null,a()}}function Y(a){throw r(a="Aborted("+a+")"),G=!0,a=new WebAssembly.RuntimeError(a+". Build with -sASSERTIONS for more info."),c(a),a}function Z(){return{a:{Ta:aa,Va:_,W:av,la:ax,b:aB,u:aC,R:aD,Za:aE,d:aF,pb:aH,g:az,T:aL,Ga:aM,lb:aP,nb:aQ,Ha:aR,Ea:aS,wb:aT,Da:aU,pa:aV,mb:aW,jb:aX,Fa:aY,kb:aZ,Ma:a0,za:a7,eb:a9,cb:bh,ya:bi,V:bj,N:bk,db:bl,ma:bt,fb:bu,zb:bv,hb:bz,qb:bB,ab:bC,Aa:bD,yb:bx,Ja:bE,S:bH,Wa:bI,$:bU,G:bW,E:bZ,m:bc,H:b_,B:b1,X:b2,J:b3,v:b4,O:b5,D:b6,t:b7,A:b8,z:b9,w:ca,r:cb,tb:cc,ub:cg,vb:ch,rb:ci,sb:cj,bb:cm,Oa:cn,La:cp,y:cs,ja:ct,Ba:cu,Ka:co,qa:cv,Ia:cw,ib:cx,U:cl,fa:cy,Sa:cz,gb:cA,Qa:cE,Pa:cF,Ab:cJ,Ca:cK,ob:aj,aa:cL,oa:cM,xb:cN,na:cP,$a:eo,ia:eB,sa:eG,ga:em,da:eu,ua:eE,p:ek,e:d4,c:d2,ea:es,f:d5,n:d7,k:eg,Y:d9,ka:eh,j:el,wa:er,Ra:eJ,ca:ez,Ua:eI,P:et,K:eb,_:ey,Q:en,Z:eC,x:ea,l:d3,va:ex,i:d1,h:d8,ra:eH,ta:eF,o:d6,q:ec,s:ee,I:ef,C:ej,L:ei,xa:eq,_a:ep,F:eA,Ya:ev,ba:eD,M:ed,Xa:ew,ha:cQ,a:s,Na:ah}}}var $={1319426:()=>"u">typeof wasmOffsetConverter,1319483:(b,c,d,e,f)=>{if(void 0===a||!a.Bd)return 1;if((b=aK(Number(b>>>0))).startsWith("./")&&(b=b.substring(2)),!(b=a.Bd.get(b)))return 2;if(c=Number(c>>>0),d=Number(d>>>0),e=Number(e>>>0),c+d>b.byteLength)return 3;try{let g=b.subarray(c,c+d);switch(f){case 0:J().set(g,e>>>0);break;case 1:a.$d(e,g);break;default:return 4}return 0}catch{return 4}},1320198:(b,c,d)=>{a.Jd(b,J().subarray(c>>>0,c+d>>>0))},1320261:()=>a.Yd(),1320302:b=>{a.Id(b)},1320338:()=>{a.Sd()},1320369:()=>{a.Td()},1320398:()=>{a.Xd()},1320423:b=>a.Rd(b),1320456:b=>a.Vd(b),1320488:(b,c,d)=>{a.Hd(Number(b),Number(c),Number(d),!0)},1320551:(b,c,d)=>{a.Hd(Number(b),Number(c),Number(d))},1320608:b=>{a.hc("Abs",b,void 0)},1320659:b=>{a.hc("Neg",b,void 0)},1320710:b=>{a.hc("Floor",b,void 0)},1320763:b=>{a.hc("Ceil",b,void 0)},1320815:b=>{a.hc("Reciprocal",b,void 0)},1320873:b=>{a.hc("Sqrt",b,void 0)},1320925:b=>{a.hc("Exp",b,void 0)},1320976:b=>{a.hc("Erf",b,void 0)},1321027:b=>{a.hc("Sigmoid",b,void 0)},1321082:(b,c,d)=>{a.hc("HardSigmoid",b,{alpha:c,beta:d})},1321161:b=>{a.hc("Log",b,void 0)},1321212:b=>{a.hc("Sin",b,void 0)},1321263:b=>{a.hc("Cos",b,void 0)},1321314:b=>{a.hc("Tan",b,void 0)},1321365:b=>{a.hc("Asin",b,void 0)},1321417:b=>{a.hc("Acos",b,void 0)},1321469:b=>{a.hc("Atan",b,void 0)},1321521:b=>{a.hc("Sinh",b,void 0)},1321573:b=>{a.hc("Cosh",b,void 0)},1321625:b=>{a.hc("Asinh",b,void 0)},1321678:b=>{a.hc("Acosh",b,void 0)},1321731:b=>{a.hc("Atanh",b,void 0)},1321784:b=>{a.hc("Tanh",b,void 0)},1321836:b=>{a.hc("Not",b,void 0)},1321887:(b,c,d)=>{a.hc("Clip",b,{min:c,max:d})},1321956:b=>{a.hc("Clip",b,void 0)},1322008:(b,c)=>{a.hc("Elu",b,{alpha:c})},1322066:b=>{a.hc("Gelu",b,void 0)},1322118:b=>{a.hc("Relu",b,void 0)},1322170:(b,c)=>{a.hc("LeakyRelu",b,{alpha:c})},1322234:(b,c)=>{a.hc("ThresholdedRelu",b,{alpha:c})},1322304:(b,c)=>{a.hc("Cast",b,{to:c})},1322362:b=>{a.hc("Add",b,void 0)},1322413:b=>{a.hc("Sub",b,void 0)},1322464:b=>{a.hc("Mul",b,void 0)},1322515:b=>{a.hc("Div",b,void 0)},1322566:b=>{a.hc("Pow",b,void 0)},1322617:b=>{a.hc("Equal",b,void 0)},1322670:b=>{a.hc("Greater",b,void 0)},1322725:b=>{a.hc("GreaterOrEqual",b,void 0)},1322787:b=>{a.hc("Less",b,void 0)},1322839:b=>{a.hc("LessOrEqual",b,void 0)},1322898:(b,c,d,e,f)=>{a.hc("ReduceMean",b,{keepDims:!!c,noopWithEmptyAxes:!!d,axes:e?Array.from(M().subarray(Number(e)>>>0,Number(f)>>>0)):[]})},1323073:(b,c,d,e,f)=>{a.hc("ReduceMax",b,{keepDims:!!c,noopWithEmptyAxes:!!d,axes:e?Array.from(M().subarray(Number(e)>>>0,Number(f)>>>0)):[]})},1323247:(b,c,d,e,f)=>{a.hc("ReduceMin",b,{keepDims:!!c,noopWithEmptyAxes:!!d,axes:e?Array.from(M().subarray(Number(e)>>>0,Number(f)>>>0)):[]})},1323421:(b,c,d,e,f)=>{a.hc("ReduceProd",b,{keepDims:!!c,noopWithEmptyAxes:!!d,axes:e?Array.from(M().subarray(Number(e)>>>0,Number(f)>>>0)):[]})},1323596:(b,c,d,e,f)=>{a.hc("ReduceSum",b,{keepDims:!!c,noopWithEmptyAxes:!!d,axes:e?Array.from(M().subarray(Number(e)>>>0,Number(f)>>>0)):[]})},1323770:(b,c,d,e,f)=>{a.hc("ReduceL1",b,{keepDims:!!c,noopWithEmptyAxes:!!d,axes:e?Array.from(M().subarray(Number(e)>>>0,Number(f)>>>0)):[]})},1323943:(b,c,d,e,f)=>{a.hc("ReduceL2",b,{keepDims:!!c,noopWithEmptyAxes:!!d,axes:e?Array.from(M().subarray(Number(e)>>>0,Number(f)>>>0)):[]})},1324116:(b,c,d,e,f)=>{a.hc("ReduceLogSum",b,{keepDims:!!c,noopWithEmptyAxes:!!d,axes:e?Array.from(M().subarray(Number(e)>>>0,Number(f)>>>0)):[]})},1324293:(b,c,d,e,f)=>{a.hc("ReduceSumSquare",b,{keepDims:!!c,noopWithEmptyAxes:!!d,axes:e?Array.from(M().subarray(Number(e)>>>0,Number(f)>>>0)):[]})},1324473:(b,c,d,e,f)=>{a.hc("ReduceLogSumExp",b,{keepDims:!!c,noopWithEmptyAxes:!!d,axes:e?Array.from(M().subarray(Number(e)>>>0,Number(f)>>>0)):[]})},1324653:b=>{a.hc("Where",b,void 0)},1324706:(b,c,d)=>{a.hc("Transpose",b,{perm:c?Array.from(M().subarray(Number(c)>>>0,Number(d)>>>0)):[]})},1324830:(b,c,d,e)=>{a.hc("DepthToSpace",b,{blocksize:c,mode:aK(d),format:e?"NHWC":"NCHW"})},1324963:(b,c,d,e)=>{a.hc("DepthToSpace",b,{blocksize:c,mode:aK(d),format:e?"NHWC":"NCHW"})},1325096:(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p)=>{a.hc("ConvTranspose",b,{format:j?"NHWC":"NCHW",autoPad:c,dilations:[d],group:e,kernelShape:[f],pads:[g,h],strides:[i],wIsConst:()=>!!I()[k>>>0],outputPadding:l?Array.from(M().subarray(Number(l)>>>0,Number(m)>>>0)):[],outputShape:n?Array.from(M().subarray(Number(n)>>>0,Number(o)>>>0)):[],activation:aK(p)})},1325529:(b,c,d,e,f,g,h,i,j,k,l,m,n,o)=>{a.hc("ConvTranspose",b,{format:i?"NHWC":"NCHW",autoPad:c,dilations:Array.from(M().subarray(Number(d)>>>0,2+(Number(d)>>>0)>>>0)),group:e,kernelShape:Array.from(M().subarray(Number(f)>>>0,2+(Number(f)>>>0)>>>0)),pads:Array.from(M().subarray(Number(g)>>>0,4+(Number(g)>>>0)>>>0)),strides:Array.from(M().subarray(Number(h)>>>0,2+(Number(h)>>>0)>>>0)),wIsConst:()=>!!I()[j>>>0],outputPadding:k?Array.from(M().subarray(Number(k)>>>0,Number(l)>>>0)):[],outputShape:m?Array.from(M().subarray(Number(m)>>>0,Number(n)>>>0)):[],activation:aK(o)})},1326190:(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p)=>{a.hc("ConvTranspose",b,{format:j?"NHWC":"NCHW",autoPad:c,dilations:[d],group:e,kernelShape:[f],pads:[g,h],strides:[i],wIsConst:()=>!!I()[k>>>0],outputPadding:l?Array.from(M().subarray(Number(l)>>>0,Number(m)>>>0)):[],outputShape:n?Array.from(M().subarray(Number(n)>>>0,Number(o)>>>0)):[],activation:aK(p)})},1326623:(b,c,d,e,f,g,h,i,j,k,l,m,n,o)=>{a.hc("ConvTranspose",b,{format:i?"NHWC":"NCHW",autoPad:c,dilations:Array.from(M().subarray(Number(d)>>>0,2+(Number(d)>>>0)>>>0)),group:e,kernelShape:Array.from(M().subarray(Number(f)>>>0,2+(Number(f)>>>0)>>>0)),pads:Array.from(M().subarray(Number(g)>>>0,4+(Number(g)>>>0)>>>0)),strides:Array.from(M().subarray(Number(h)>>>0,2+(Number(h)>>>0)>>>0)),wIsConst:()=>!!I()[j>>>0],outputPadding:k?Array.from(M().subarray(Number(k)>>>0,Number(l)>>>0)):[],outputShape:m?Array.from(M().subarray(Number(m)>>>0,Number(n)>>>0)):[],activation:aK(o)})},1327284:(b,c)=>{a.hc("GlobalAveragePool",b,{format:c?"NHWC":"NCHW"})},1327375:(b,c,d,e,f,g,h,i,j,k,l,m,n,o)=>{a.hc("AveragePool",b,{format:o?"NHWC":"NCHW",auto_pad:c,ceil_mode:d,count_include_pad:e,storage_order:f,dilations:g?Array.from(M().subarray(Number(g)>>>0,Number(h)>>>0)):[],kernel_shape:i?Array.from(M().subarray(Number(i)>>>0,Number(j)>>>0)):[],pads:k?Array.from(M().subarray(Number(k)>>>0,Number(l)>>>0)):[],strides:m?Array.from(M().subarray(Number(m)>>>0,Number(n)>>>0)):[]})},1327854:(b,c)=>{a.hc("GlobalAveragePool",b,{format:c?"NHWC":"NCHW"})},1327945:(b,c,d,e,f,g,h,i,j,k,l,m,n,o)=>{a.hc("AveragePool",b,{format:o?"NHWC":"NCHW",auto_pad:c,ceil_mode:d,count_include_pad:e,storage_order:f,dilations:g?Array.from(M().subarray(Number(g)>>>0,Number(h)>>>0)):[],kernel_shape:i?Array.from(M().subarray(Number(i)>>>0,Number(j)>>>0)):[],pads:k?Array.from(M().subarray(Number(k)>>>0,Number(l)>>>0)):[],strides:m?Array.from(M().subarray(Number(m)>>>0,Number(n)>>>0)):[]})},1328424:(b,c)=>{a.hc("GlobalMaxPool",b,{format:c?"NHWC":"NCHW"})},1328511:(b,c,d,e,f,g,h,i,j,k,l,m,n,o)=>{a.hc("MaxPool",b,{format:o?"NHWC":"NCHW",auto_pad:c,ceil_mode:d,count_include_pad:e,storage_order:f,dilations:g?Array.from(M().subarray(Number(g)>>>0,Number(h)>>>0)):[],kernel_shape:i?Array.from(M().subarray(Number(i)>>>0,Number(j)>>>0)):[],pads:k?Array.from(M().subarray(Number(k)>>>0,Number(l)>>>0)):[],strides:m?Array.from(M().subarray(Number(m)>>>0,Number(n)>>>0)):[]})},1328986:(b,c)=>{a.hc("GlobalMaxPool",b,{format:c?"NHWC":"NCHW"})},1329073:(b,c,d,e,f,g,h,i,j,k,l,m,n,o)=>{a.hc("MaxPool",b,{format:o?"NHWC":"NCHW",auto_pad:c,ceil_mode:d,count_include_pad:e,storage_order:f,dilations:g?Array.from(M().subarray(Number(g)>>>0,Number(h)>>>0)):[],kernel_shape:i?Array.from(M().subarray(Number(i)>>>0,Number(j)>>>0)):[],pads:k?Array.from(M().subarray(Number(k)>>>0,Number(l)>>>0)):[],strides:m?Array.from(M().subarray(Number(m)>>>0,Number(n)>>>0)):[]})},1329548:(b,c,d,e,f)=>{a.hc("Gemm",b,{alpha:c,beta:d,transA:e,transB:f})},1329652:b=>{a.hc("MatMul",b,void 0)},1329706:(b,c,d,e)=>{a.hc("ArgMax",b,{keepDims:!!c,selectLastIndex:!!d,axis:e})},1329814:(b,c,d,e)=>{a.hc("ArgMin",b,{keepDims:!!c,selectLastIndex:!!d,axis:e})},1329922:(b,c)=>{a.hc("Softmax",b,{axis:c})},1329985:(b,c)=>{a.hc("Concat",b,{axis:c})},1330045:(b,c,d,e,f)=>{a.hc("Split",b,{axis:c,numOutputs:d,splitSizes:e?Array.from(M().subarray(Number(e)>>>0,Number(f)>>>0)):[]})},1330201:b=>{a.hc("Expand",b,void 0)},1330255:(b,c)=>{a.hc("Gather",b,{axis:Number(c)})},1330326:(b,c)=>{a.hc("GatherElements",b,{axis:Number(c)})},1330405:(b,c)=>{a.hc("GatherND",b,{batch_dims:Number(c)})},1330484:(b,c,d,e,f,g,h,i,j,k,l)=>{a.hc("Resize",b,{antialias:c,axes:d?Array.from(M().subarray(Number(d)>>>0,Number(e)>>>0)):[],coordinateTransformMode:aK(f),cubicCoeffA:g,excludeOutside:h,extrapolationValue:i,keepAspectRatioPolicy:aK(j),mode:aK(k),nearestMode:aK(l)})},1330846:(b,c,d,e,f,g,h)=>{a.hc("Slice",b,{starts:c?Array.from(M().subarray(Number(c)>>>0,Number(d)>>>0)):[],ends:e?Array.from(M().subarray(Number(e)>>>0,Number(f)>>>0)):[],axes:g?Array.from(M().subarray(Number(g)>>>0,Number(h)>>>0)):[]})},1331110:b=>{a.hc("Tile",b,void 0)},1331162:(b,c,d)=>{a.hc("InstanceNormalization",b,{epsilon:c,format:d?"NHWC":"NCHW"})},1331276:(b,c,d)=>{a.hc("InstanceNormalization",b,{epsilon:c,format:d?"NHWC":"NCHW"})},1331390:b=>{a.hc("Range",b,void 0)},1331443:(b,c)=>{a.hc("Einsum",b,{equation:aK(c)})},1331524:(b,c,d,e,f)=>{a.hc("Pad",b,{mode:c,value:d,pads:e?Array.from(M().subarray(Number(e)>>>0,Number(f)>>>0)):[]})},1331667:(b,c,d,e,f,g)=>{a.hc("BatchNormalization",b,{epsilon:c,momentum:d,spatial:!!f,trainingMode:!!e,format:g?"NHWC":"NCHW"})},1331836:(b,c,d,e,f,g)=>{a.hc("BatchNormalization",b,{epsilon:c,momentum:d,spatial:!!f,trainingMode:!!e,format:g?"NHWC":"NCHW"})},1332005:(b,c,d)=>{a.hc("CumSum",b,{exclusive:Number(c),reverse:Number(d)})},1332102:(b,c,d)=>{a.hc("DequantizeLinear",b,{axis:c,blockSize:d})},1332192:(b,c,d,e,f)=>{a.hc("GridSample",b,{align_corners:c,mode:aK(d),padding_mode:aK(e),format:f?"NHWC":"NCHW"})},1332362:(b,c,d,e,f)=>{a.hc("GridSample",b,{align_corners:c,mode:aK(d),padding_mode:aK(e),format:f?"NHWC":"NCHW"})},1332532:(b,c)=>{a.hc("ScatterND",b,{reduction:aK(c)})},1332617:(b,c,d,e,f,g,h,i,j)=>{a.hc("Attention",b,{numHeads:c,isUnidirectional:d,maskFilterValue:e,scale:f,doRotary:g,qkvHiddenSizes:h?Array.from(M().subarray(Number(i)>>>0,Number(i)+h>>>0)):[],pastPresentShareBuffer:!!j})},1332889:b=>{a.hc("BiasAdd",b,void 0)},1332944:b=>{a.hc("BiasSplitGelu",b,void 0)},1333005:b=>{a.hc("FastGelu",b,void 0)},1333061:(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q)=>{a.hc("Conv",b,{format:m?"NHWC":"NCHW",auto_pad:c,dilations:d?Array.from(M().subarray(Number(d)>>>0,Number(e)>>>0)):[],group:f,kernel_shape:g?Array.from(M().subarray(Number(g)>>>0,Number(h)>>>0)):[],pads:i?Array.from(M().subarray(Number(i)>>>0,Number(j)>>>0)):[],strides:k?Array.from(M().subarray(Number(k)>>>0,Number(l)>>>0)):[],w_is_const:()=>!!I()[Number(n)>>>0],activation:aK(o),activation_params:p?Array.from(O().subarray(Number(p)>>>0,Number(q)>>>0)):[]})},1333645:b=>{a.hc("Gelu",b,void 0)},1333697:(b,c,d,e,f,g,h,i,j)=>{a.hc("GroupQueryAttention",b,{numHeads:c,kvNumHeads:d,scale:e,softcap:f,doRotary:g,rotaryInterleaved:h,smoothSoftmax:i,localWindowSize:j})},1333914:(b,c,d,e)=>{a.hc("LayerNormalization",b,{axis:c,epsilon:d,simplified:!!e})},1334025:(b,c,d,e)=>{a.hc("LayerNormalization",b,{axis:c,epsilon:d,simplified:!!e})},1334136:(b,c,d,e,f,g)=>{a.hc("MatMulNBits",b,{k:c,n:d,accuracyLevel:e,bits:f,blockSize:g})},1334263:(b,c,d,e,f,g)=>{a.hc("MultiHeadAttention",b,{numHeads:c,isUnidirectional:d,maskFilterValue:e,scale:f,doRotary:g})},1334422:(b,c)=>{a.hc("QuickGelu",b,{alpha:c})},1334486:(b,c,d,e,f)=>{a.hc("RotaryEmbedding",b,{interleaved:!!c,numHeads:d,rotaryEmbeddingDim:e,scale:f})},1334625:(b,c,d)=>{a.hc("SkipLayerNormalization",b,{epsilon:c,simplified:!!d})},1334727:(b,c,d)=>{a.hc("SkipLayerNormalization",b,{epsilon:c,simplified:!!d})},1334829:(b,c,d,e)=>{a.hc("GatherBlockQuantized",b,{gatherAxis:c,quantizeAxis:d,blockSize:e})},1334950:b=>{a.Wd(b)},1334984:(b,c)=>a.Zd(Number(b),Number(c),a.Cd.be,a.Cd.errors)};function _(b,c,d){return bT(async()=>{await a.Ud(Number(b),Number(c),Number(d))})}function aa(){return"u">typeof wasmOffsetConverter}class ab{name="ExitStatus";constructor(a){this.message=`Program terminated with exit(${a})`,this.status=a}}var ac=a=>{a.terminate(),a.onmessage=()=>{}},ad=[],ae=a=>{0==ak.length&&(ar(),aq(ak[0]));var b=ak.pop();if(!b)return 6;al.push(b),an[a.xd]=b,b.xd=a.xd;var c={yd:"run",de:a.ce,Fd:a.Fd,xd:a.xd};return b.postMessage(c,a.Ld),0},af=0,ag=(a,b,...c)=>{for(var d=2*c.length,e=da(),f=c9(8*d),g=f>>>3,h=0;h<c.length;h++){var i=c[h];"bigint"==typeof i?(C[g+2*h]=1n,C[g+2*h+1]=i):(C[g+2*h]=0n,P()[g+2*h+1>>>0]=i)}return a=c0(a,0,d,f,b),c8(e),a};function ah(a){if(g)return ag(0,1,a);if(u=a,!(0<af)){for(var b of al)ac(b);for(b of ak)ac(b);ak=[],al=[],an={},G=!0}m(0,new ab(a))}function ai(a){if(g)return ag(1,0,a);aj(a)}var aj=a=>{if(u=a,g)throw ai(a),"unwind";ah(a)},ak=[],al=[],am=[],an={},ao=a=>{var b=a.xd;delete an[b],ak.push(a),al.splice(al.indexOf(a),1),a.xd=0,c1(b)};function ap(){am.forEach(a=>a())}var aq=b=>new Promise(c=>{b.onmessage=d=>{var e=(d=d.data).yd;if(d.Ed&&d.Ed!=cX()){var f=an[d.Ed];f?f.postMessage(d,d.Ld):r(`Internal error! Worker sent a message "${e}" to target pthread ${d.Ed}, but that thread no longer exists!`)}else"checkMailbox"===e?by():"spawnThread"===e?ae(d):"cleanupThread"===e?ao(an[d.ee]):"loaded"===e?(b.loaded=!0,c(b)):"alert"===e?alert(`Thread ${d.fe}: ${d.text}`):"setimmediate"===d.target?b.postMessage(d):"callHandler"===e?a[d.Nd](...d.args):e&&r(`worker sent an unknown command ${e}`)},b.onerror=a=>{throw r(`worker sent an error! ${a.filename}:${a.lineno}: ${a.message}`),a};var d,e=[];for(d of[])a.propertyIsEnumerable(d)&&e.push(d);b.postMessage({yd:"load",Od:e,he:s,ie:t})});function ar(){var a=new Worker("file:///home/runner/work/veyra/veyra/src/node_modules/onnxruntime-web/dist/ort.webgpu.bundle.min.mjs".startsWith("file:")?new URL("ort.webgpu.bundle.min.mjs","file:///home/runner/work/veyra/veyra/src/node_modules/onnxruntime-web/dist/ort.webgpu.bundle.min.mjs"):new URL("file:///home/runner/work/veyra/veyra/src/node_modules/onnxruntime-web/dist/ort.webgpu.bundle.min.mjs"),{type:"module",workerData:"em-pthread",name:"em-pthread"});ak.push(a)}var as=a=>{S();var b=N()[a+52>>>2>>>0];a=N()[a+56>>>2>>>0],c7(b,b-a),c8(b)},at=(a,b)=>{af=0,a=dh(a,b),0<af?u=a:c2(a)},au=[];function av(a){var b=new ay(a>>>=0);if(0==I()[b.wd+12>>>0]){var c=1;I()[b.wd+12>>>0]=c}return c=0,I()[b.wd+13>>>0]=c,au.push(b),dc(a),de(a)}var aw=0,ax=()=>{c5(0,0);var a=au.pop();db(a.Gd),aw=0};class ay{constructor(a){this.Gd=a,this.wd=a-24}}function az(a){throw aw||=a>>>0}var aA=a=>{var b=aw;if(!b)return c6(0),0;var c=new ay(b);N()[c.wd+16>>>2>>>0]=b;var d=N()[c.wd+4>>>2>>>0];if(!d)return c6(0),b;for(var e of a){if(0===e||e===d)break;if(dd(e,d,c.wd+16))return c6(e),b}return c6(d),b};function aB(){return aA([])}function aC(a){return aA([a>>>0])}function aD(a,b){return aA([a>>>0,b>>>0])}var aE=()=>{var a=au.pop();a||Y("no exception to throw");var b=a.Gd;if(0==I()[a.wd+13>>>0]){au.push(a);var c=1;I()[a.wd+13>>>0]=c,c=0,I()[a.wd+12>>>0]=c}throw aw=b};function aF(a,b,c){var d=new ay(a>>>=0);throw b>>>=0,c>>>=0,N()[d.wd+16>>>2>>>0]=0,N()[d.wd+4>>>2>>>0]=b,N()[d.wd+8>>>2>>>0]=c,aw=a}function aG(a,b,c,d){return g?ag(2,1,a,b,c,d):aH(a,b,c,d)}function aH(a,b,c,d){if(a>>>=0,c>>>=0,d>>>=0,void 0===h)return 6;var e=[];return g&&0===e.length?aG(a,b>>>=0,c,d):(a={ce:c,xd:a,Fd:d,Ld:e},g?(a.yd="spawnThread",postMessage(a,e),0):ae(a))}var aI="u">typeof TextDecoder?new TextDecoder:void 0,aJ=(a,b=0,c=0/0)=>{var d=(b>>>=0)+c;for(c=b;a[c]&&!(c>=d);)++c;if(16<c-b&&a.buffer&&aI)return aI.decode(a.buffer instanceof ArrayBuffer?a.subarray(b,c):a.slice(b,c));for(d="";b<c;){var e=a[b++];if(128&e){var f=63&a[b++];if((224&e)==192)d+=String.fromCharCode((31&e)<<6|f);else{var g=63&a[b++];65536>(e=(240&e)==224?(15&e)<<12|f<<6|g:(7&e)<<18|f<<12|g<<6|63&a[b++])?d+=String.fromCharCode(e):(e-=65536,d+=String.fromCharCode(55296|e>>10,56320|1023&e))}}else d+=String.fromCharCode(e)}return d},aK=(a,b)=>(a>>>=0)?aJ(J(),a,b):"";function aL(a,b,c){return g?ag(3,1,a,b,c):0}function aM(a,b){if(g)return ag(4,1,a,b)}var aN=a=>{for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);127>=d?b++:2047>=d?b+=2:55296<=d&&57343>=d?(b+=4,++c):b+=3}return b},aO=(a,b,c)=>{var d=J();if(b>>>=0,0<c){var e=b;c=b+c-1;for(var f=0;f<a.length;++f){var g=a.charCodeAt(f);if(55296<=g&&57343>=g&&(g=65536+((1023&g)<<10)|1023&a.charCodeAt(++f)),127>=g){if(b>=c)break;d[b++>>>0]=g}else{if(2047>=g){if(b+1>=c)break;d[b++>>>0]=192|g>>6}else{if(65535>=g){if(b+2>=c)break;d[b++>>>0]=224|g>>12}else{if(b+3>=c)break;d[b++>>>0]=240|g>>18,d[b++>>>0]=128|g>>12&63}d[b++>>>0]=128|g>>6&63}d[b++>>>0]=128|63&g}}d[b>>>0]=0,a=b-e}else a=0;return a};function aP(a,b){if(g)return ag(5,1,a,b)}function aQ(a,b,c){if(g)return ag(6,1,a,b,c)}function aR(a,b,c){return g?ag(7,1,a,b,c):0}function aS(a,b){if(g)return ag(8,1,a,b)}function aT(a,b,c){if(g)return ag(9,1,a,b,c)}function aU(a,b,c,d){if(g)return ag(10,1,a,b,c,d)}function aV(a,b,c,d){if(g)return ag(11,1,a,b,c,d)}function aW(a,b,c,d){if(g)return ag(12,1,a,b,c,d)}function aX(a){if(g)return ag(13,1,a)}function aY(a,b){if(g)return ag(14,1,a,b)}function aZ(a,b,c){if(g)return ag(15,1,a,b,c)}var a$,a_,a0=()=>Y(""),a1=a=>{for(var b="";J()[a>>>0];)b+=a$[J()[a++>>>0]];return b},a2={},a3={},a4={};function a5(a,b,c={}){return function(a,b,c={}){var d=b.name;if(!a)throw new a_(`type "${d}" must have a positive integer typeid pointer`);if(a3.hasOwnProperty(a)){if(c.Pd)return;throw new a_(`Cannot register type '${d}' twice`)}a3[a]=b,delete a4[a],a2.hasOwnProperty(a)&&(b=a2[a],delete a2[a],b.forEach(a=>a()))}(a,b,c)}var a6=(a,b,c)=>{switch(b){case 1:return c?a=>I()[a>>>0]:a=>J()[a>>>0];case 2:return c?a=>K()[a>>>1>>>0]:a=>L()[a>>>1>>>0];case 4:return c?a=>M()[a>>>2>>>0]:a=>N()[a>>>2>>>0];case 8:return c?a=>C[a>>>3]:a=>D[a>>>3];default:throw TypeError(`invalid integer width (${b}): ${a}`)}};function a7(a,b,c){c>>>=0,a5(a>>>=0,{name:b=a1(b>>>0),fromWireType:a=>a,toWireType:function(a,b){if("bigint"!=typeof b&&"number"!=typeof b)throw b=null===b?"null":"object"==(a=typeof b)||"array"===a||"function"===a?b.toString():""+b,TypeError(`Cannot convert "${b}" to ${this.name}`);return"number"==typeof b&&(b=BigInt(b)),b},zd:a8,readValueFromPointer:a6(b,c,-1==b.indexOf("u")),Ad:null})}var a8=8;function a9(a,b,c,d){a5(a>>>=0,{name:b=a1(b>>>0),fromWireType:function(a){return!!a},toWireType:function(a,b){return b?c:d},zd:a8,readValueFromPointer:function(a){return this.fromWireType(J()[a>>>0])},Ad:null})}var ba=[],bb=[];function bc(a){9<(a>>>=0)&&0==--bb[a+1]&&(bb[a]=void 0,ba.push(a))}var bd=a=>{if(!a)throw new a_("Cannot use deleted val. handle = "+a);return bb[a]},be=a=>{switch(a){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let b=ba.pop()||bb.length;return bb[b]=a,bb[b+1]=1,b}};function bf(a){return this.fromWireType(N()[a>>>2>>>0])}var bg={name:"emscripten::val",fromWireType:a=>{var b=bd(a);return bc(a),b},toWireType:(a,b)=>be(b),zd:8,readValueFromPointer:bf,Ad:null};function bh(a){return a5(a>>>0,bg)}function bi(a,b,c){c>>>=0,a5(a>>>=0,{name:b=a1(b>>>0),fromWireType:a=>a,toWireType:(a,b)=>b,zd:a8,readValueFromPointer:((a,b)=>{switch(b){case 4:return function(a){return this.fromWireType(O()[a>>>2>>>0])};case 8:return function(a){return this.fromWireType(P()[a>>>3>>>0])};default:throw TypeError(`invalid float width (${b}): ${a}`)}})(b,c),Ad:null})}function bj(a,b,c,d,e){if(a>>>=0,c>>>=0,b=a1(b>>>0),-1===e&&(e=0xffffffff),e=a=>a,0===d){var f=32-8*c;e=a=>a<<f>>>f}var g=b.includes("unsigned")?function(a,b){return b>>>0}:function(a,b){return b};a5(a,{name:b,fromWireType:e,toWireType:g,zd:a8,readValueFromPointer:a6(b,c,0!==d),Ad:null})}function bk(a,b,c){function d(a){var b=N()[a>>>2>>>0];return a=N()[a+4>>>2>>>0],new e(I().buffer,a,b)}var e=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][b];a5(a>>>=0,{name:c=a1(c>>>0),fromWireType:d,zd:a8,readValueFromPointer:d},{Pd:!0})}function bl(a,b){a5(a>>>=0,{name:b=a1(b>>>0),fromWireType:function(a){for(var b,c=N()[a>>>2>>>0],d=a+4,e=d,f=0;f<=c;++f){var g=d+f;f!=c&&0!=J()[g>>>0]||(e=aK(e,g-e),void 0===b?b=e:(b+="\0",b+=e),e=g+1)}return cY(a),b},toWireType:function(a,b){b instanceof ArrayBuffer&&(b=new Uint8Array(b));var c="string"==typeof b;if(!(c||b instanceof Uint8Array||b instanceof Uint8ClampedArray||b instanceof Int8Array))throw new a_("Cannot pass non-string to std::string");var d=c?aN(b):b.length,e=cZ(4+d+1),f=e+4;if(N()[e>>>2>>>0]=d,c)aO(b,f,d+1);else if(c)for(c=0;c<d;++c){var g=b.charCodeAt(c);if(255<g)throw cY(e),new a_("String has UTF-16 code units that do not fit in 8 bits");J()[f+c>>>0]=g}else for(c=0;c<d;++c)J()[f+c>>>0]=b[c];return null!==a&&a.push(cY,e),e},zd:a8,readValueFromPointer:bf,Ad(a){cY(a)}})}var bm="u">typeof TextDecoder?new TextDecoder("utf-16le"):void 0,bn=(a,b)=>{for(var c=a>>1,d=c+b/2;!(c>=d)&&L()[c>>>0];)++c;if(32<(c<<=1)-a&&bm)return bm.decode(J().slice(a,c));for(c="",d=0;!(d>=b/2);++d){var e=K()[a+2*d>>>1>>>0];if(0==e)break;c+=String.fromCharCode(e)}return c},bo=(a,b,c)=>{if(2>(c??=0x7fffffff))return 0;var d=b;c=(c-=2)<2*a.length?c/2:a.length;for(var e=0;e<c;++e){var f=a.charCodeAt(e);K()[b>>>1>>>0]=f,b+=2}return K()[b>>>1>>>0]=0,b-d},bp=a=>2*a.length,bq=(a,b)=>{for(var c=0,d="";!(c>=b/4);){var e=M()[a+4*c>>>2>>>0];if(0==e)break;++c,65536<=e?(e-=65536,d+=String.fromCharCode(55296|e>>10,56320|1023&e)):d+=String.fromCharCode(e)}return d},br=(a,b,c)=>{if(b>>>=0,4>(c??=0x7fffffff))return 0;var d=b;c=d+c-4;for(var e=0;e<a.length;++e){var f=a.charCodeAt(e);if(55296<=f&&57343>=f&&(f=65536+((1023&f)<<10)|1023&a.charCodeAt(++e)),M()[b>>>2>>>0]=f,(b+=4)+4>c)break}return M()[b>>>2>>>0]=0,b-d},bs=a=>{for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);55296<=d&&57343>=d&&++c,b+=4}return b};function bt(a,b,c){if(a>>>=0,b>>>=0,c=a1(c>>>=0),2===b)var d=bn,e=bo,f=bp,g=a=>L()[a>>>1>>>0];else 4===b&&(d=bq,e=br,f=bs,g=a=>N()[a>>>2>>>0]);a5(a,{name:c,fromWireType:a=>{for(var c,e=N()[a>>>2>>>0],f=a+4,h=0;h<=e;++h){var i=a+4+h*b;h!=e&&0!=g(i)||(f=d(f,i-f),void 0===c?c=f:(c+="\0",c+=f),f=i+b)}return cY(a),c},toWireType:(a,d)=>{if("string"!=typeof d)throw new a_(`Cannot pass non-string to C++ string type ${c}`);var g=f(d),h=cZ(4+g+b);return N()[h>>>2>>>0]=g/b,e(d,h+4,g+b),null!==a&&a.push(cY,h),h},zd:a8,readValueFromPointer:bf,Ad(a){cY(a)}})}function bu(a,b){a5(a>>>=0,{Qd:!0,name:b=a1(b>>>0),zd:0,fromWireType:()=>{},toWireType:()=>{}})}function bv(a){c$(a>>>0,!f,1,!e,131072,!1),ap()}var bw=a=>{if(!G)try{if(a(),!(0<af))try{g?c2(u):aj(u)}catch(a){a instanceof ab||"unwind"==a||m(0,a)}}catch(a){a instanceof ab||"unwind"==a||m(0,a)}};function bx(a){a>>>=0,"function"==typeof Atomics.ge&&(Atomics.ge(M(),a>>>2,a).value.then(by),a+=128,Atomics.store(M(),a>>>2,1))}var by=()=>{var a=cX();a&&(bx(a),bw(c4))};function bz(a,b){(a>>>=0)==b>>>0?setTimeout(by):g?postMessage({Ed:a,yd:"checkMailbox"}):(a=an[a])&&a.postMessage({yd:"checkMailbox"})}var bA=[];function bB(a,b,c,d,e){for(b>>>=0,bA.length=d/=2,c=e>>>0>>>3,e=0;e<d;e++)bA[e]=C[c+2*e]?C[c+2*e+1]:P()[c+2*e+1>>>0];return(b?$[b]:cU[a])(...bA)}var bC=()=>{af=0};function bD(a){a>>>=0,g?postMessage({yd:"cleanupThread",ee:a}):ao(an[a])}function bE(a){}var bF=(a,b)=>{var c=a3[a];if(void 0===c)throw c=a1(a=cV(a)),cY(a),new a_(`${b} has unknown type ${c}`);return c},bG=(a,b,c)=>{var d=[];return a=a.toWireType(d,c),d.length&&(N()[b>>>2>>>0]=be(d)),a};function bH(a,b,c){return b>>>=0,c>>>=0,a=bd(a>>>0),bG(b=bF(b,"emval::as"),c,a)}function bI(a,b){return b>>>=0,a=bd(a>>>0),(b=bF(b,"emval::as")).toWireType(null,a)}var bJ=a=>{try{a()}catch(a){Y(a)}},bK=0,bL=null,bM=0,bN=[],bO={},bP={},bQ=0,bR=null,bS=[];function bT(a){return function(a){if(!G){if(0===bK){var b,c,d,e=!1,f=!1;a((a=0)=>{if(!G&&(bM=a,e=!0,f)){bK=2,bJ(()=>d_(bL)),"u">typeof MainLoop&&MainLoop.Md&&MainLoop.resume(),a=!1;try{var b,c=(b=cT[bP[b=M()[bL+8>>>2>>>0]]],--af,b())}catch(b){c=b,a=!0}var d=!1;if(!bL){var g=bR;g&&(bR=null,(a?g.reject:g.resolve)(c),d=!0)}if(a&&!d)throw c}}),f=!0,e||(bK=1,c=(b=cZ(65548))+12,N()[b>>>2>>>0]=c,N()[b+4>>>2>>>0]=c+65536,void 0===(d=bO[c=bN[0]])&&(d=bQ++,bO[c]=d,bP[d]=c),c=d,M()[b+8>>>2>>>0]=c,bL=b,"u">typeof MainLoop&&MainLoop.Md&&MainLoop.pause(),bJ(()=>dZ(bL)))}else 2===bK?(bK=0,bJ(d0),cY(bL),bL=null,bS.forEach(bw)):Y(`invalid state: ${bK}`);return bM}}(b=>{a().then(b)})}function bU(a){return a>>>=0,bT(async()=>be(await bd(a)))}var bV=[];function bW(a,b,c,d){return c>>>=0,d>>>=0,(a=bV[a>>>0])(null,b=bd(b>>>0),c,d)}var bX={},bY=a=>{var b=bX[a];return void 0===b?a1(a):b};function bZ(a,b,c,d,e){return c>>>=0,d>>>=0,e>>>=0,(a=bV[a>>>0])(b=bd(b>>>0),b[c=bY(c)],d,e)}var b$=()=>"object"==typeof globalThis?globalThis:Function("return this")();function b_(a){return 0==(a>>>=0)?be(b$()):(a=bY(a),be(b$()[a]))}var b0=(a,b)=>Object.defineProperty(b,"name",{value:a});function b1(a,b,c){var d,e,f=(b=((a,b)=>{for(var c=Array(a),d=0;d<a;++d)c[d]=bF(N()[b+4*d>>>2>>>0],"parameter "+d);return c})(a,b>>>0)).shift();a--;var g=`return function (obj, func, destructorsRef, args) {
`,h=0,i=[];0===c&&i.push("obj");for(var j=["retType"],k=[f],l=0;l<a;++l)i.push("arg"+l),j.push("argType"+l),k.push(b[l]),g+=`  var arg${l} = argType${l}.readValueFromPointer(args${h?"+"+h:""});
`,h+=b[l].zd;return g+=`  var rv = ${1===c?"new func":"func.call"}(${i.join(", ")});
`,f.Qd||(j.push("emval_returnValue"),k.push(bG),g+=`  return emval_returnValue(retType, destructorsRef, rv);
`),j.push(g+`};
`),a=(function(a){var b=Function;if(!(b instanceof Function))throw TypeError(`new_ called with constructor type ${typeof b} which is not a function`);var c=b0(b.name||"unknownFunctionName",function(){});return c.prototype=b.prototype,c=new c,(a=b.apply(c,a))instanceof Object?a:c})(j)(...k),d=b0(c=`methodCaller<(${b.map(a=>a.name).join(", ")}) => ${f.name}>`,a),e=bV.length,bV.push(d),e}function b2(b){return be(a[b=bY(b>>>0)])}function b3(a,b){return b>>>=0,be((a=bd(a>>>0))[b=bd(b)])}function b4(a){9<(a>>>=0)&&(bb[a+1]+=1)}function b5(){return be([])}function b6(a){a=bd(a>>>0);for(var b=Array(a.length),c=0;c<a.length;c++)b[c]=a[c];return be(b)}function b7(a){return be(bY(a>>>0))}function b8(){return be({})}function b9(a){for(var b=bd(a>>>=0);b.length;){var c=b.pop();b.pop()(c)}bc(a)}function ca(a,b,c){b>>>=0,c>>>=0,a=bd(a>>>0),b=bd(b),c=bd(c),a[b]=c}function cb(a,b){return b>>>=0,be(a=(a=bF(a>>>0,"_emval_take_value")).readValueFromPointer(b))}function cc(a,b){a=-0x20000000000000>a||0x20000000000000<a?0/0:Number(a),b>>>=0,a=new Date(1e3*a),M()[b>>>2>>>0]=a.getUTCSeconds(),M()[b+4>>>2>>>0]=a.getUTCMinutes(),M()[b+8>>>2>>>0]=a.getUTCHours(),M()[b+12>>>2>>>0]=a.getUTCDate(),M()[b+16>>>2>>>0]=a.getUTCMonth(),M()[b+20>>>2>>>0]=a.getUTCFullYear()-1900,M()[b+24>>>2>>>0]=a.getUTCDay(),a=(a.getTime()-Date.UTC(a.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,M()[b+28>>>2>>>0]=a}var cd=a=>a%4==0&&(a%100!=0||a%400==0),ce=[0,31,60,91,121,152,182,213,244,274,305,335],cf=[0,31,59,90,120,151,181,212,243,273,304,334];function cg(a,b){a=-0x20000000000000>a||0x20000000000000<a?0/0:Number(a),b>>>=0,a=new Date(1e3*a),M()[b>>>2>>>0]=a.getSeconds(),M()[b+4>>>2>>>0]=a.getMinutes(),M()[b+8>>>2>>>0]=a.getHours(),M()[b+12>>>2>>>0]=a.getDate(),M()[b+16>>>2>>>0]=a.getMonth(),M()[b+20>>>2>>>0]=a.getFullYear()-1900,M()[b+24>>>2>>>0]=a.getDay();var c=(cd(a.getFullYear())?ce:cf)[a.getMonth()]+a.getDate()-1|0;M()[b+28>>>2>>>0]=c,M()[b+36>>>2>>>0]=-60*a.getTimezoneOffset(),c=new Date(a.getFullYear(),6,1).getTimezoneOffset();var d=new Date(a.getFullYear(),0,1).getTimezoneOffset();a=0|(c!=d&&a.getTimezoneOffset()==Math.min(d,c)),M()[b+32>>>2>>>0]=a}function ch(a){a>>>=0;var b=new Date(M()[a+20>>>2>>>0]+1900,M()[a+16>>>2>>>0],M()[a+12>>>2>>>0],M()[a+8>>>2>>>0],M()[a+4>>>2>>>0],M()[a>>>2>>>0],0),c=M()[a+32>>>2>>>0],d=b.getTimezoneOffset(),e=new Date(b.getFullYear(),6,1).getTimezoneOffset(),f=new Date(b.getFullYear(),0,1).getTimezoneOffset(),g=Math.min(f,e);return 0>c?M()[a+32>>>2>>>0]=+(e!=f&&g==d):0<c!=(g==d)&&(e=Math.max(f,e),b.setTime(b.getTime()+6e4*((0<c?g:e)-d))),M()[a+24>>>2>>>0]=b.getDay(),c=(cd(b.getFullYear())?ce:cf)[b.getMonth()]+b.getDate()-1|0,M()[a+28>>>2>>>0]=c,M()[a>>>2>>>0]=b.getSeconds(),M()[a+4>>>2>>>0]=b.getMinutes(),M()[a+8>>>2>>>0]=b.getHours(),M()[a+12>>>2>>>0]=b.getDate(),M()[a+16>>>2>>>0]=b.getMonth(),M()[a+20>>>2>>>0]=b.getYear(),BigInt(isNaN(a=b.getTime())?-1:a/1e3)}function ci(a,b,c,d,e,f,h){return g?ag(16,1,a,b,c,d,e,f,h):-52}function cj(a,b,c,d,e,f){if(g)return ag(17,1,a,b,c,d,e,f)}var ck={},cl=()=>performance.timeOrigin+performance.now();function cm(a,b){if(g)return ag(18,1,a,b);if(ck[a]&&(clearTimeout(ck[a].id),delete ck[a]),!b)return 0;var c=setTimeout(()=>{delete ck[a],bw(()=>c3(a,performance.timeOrigin+performance.now()))},b);return ck[a]={id:c,ke:b},0}function cn(a,b,c,d){a>>>=0,b>>>=0,c>>>=0,d>>>=0;var e=new Date().getFullYear(),f=new Date(e,0,1).getTimezoneOffset(),g=Math.max(f,e=new Date(e,6,1).getTimezoneOffset());N()[a>>>2>>>0]=60*g,M()[b>>>2>>>0]=+(f!=e),a=(b=a=>{var b=Math.abs(a);return`UTC${0<=a?"-":"+"}${String(Math.floor(b/60)).padStart(2,"0")}${String(b%60).padStart(2,"0")}`})(f),b=b(e),e<f?(aO(a,c,17),aO(b,d,17)):(aO(a,d,17),aO(b,c,17))}var co=()=>Date.now();function cp(a,b,c){return 0<=a&&3>=a?(a=0===a?Date.now():performance.timeOrigin+performance.now(),C[c>>>0>>>3]=BigInt(Math.round(1e6*a)),0):28}var cq=[],cr=(a,b)=>{cq.length=0;for(var c;c=J()[a++>>>0];){var d=105!=c;b+=(d&=112!=c)&&b%8?4:0,cq.push(112==c?N()[b>>>2>>>0]:106==c?C[b>>>3]:105==c?M()[b>>>2>>>0]:P()[b>>>3>>>0]),b+=d?8:4}return cq};function cs(a,b,c){return a>>>=0,b=cr(b>>>0,c>>>0),$[a](...b)}function ct(a,b,c){return a>>>=0,b=cr(b>>>0,c>>>0),$[a](...b)}var cu=()=>{};function cv(a,b){return r(aK(a>>>0,b>>>0))}var cw=()=>{throw af+=1,"unwind"};function cx(){return 0xffff0000}var cy=()=>navigator.hardwareConcurrency;function cz(){return Y("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function cA(a){a>>>=0;var b=J().length;if(a<=b||0xffff0000<a)return!1;for(var c=1;4>=c;c*=2){var d=b*(1+.2/c);d=Math.min(d,a+0x6000000);a:{d=(Math.min(0xffff0000,65536*Math.ceil(Math.max(a,d)/65536))-s.buffer.byteLength+65535)/65536|0;try{s.grow(d),S();var e=1;break a}catch{}e=void 0}if(e)return!0}return!1}var cB=()=>(Y("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),cC={},cD=a=>{a.forEach(a=>{var b=cB();b&&(cC[b]=a)})};function cE(){var a=Error().stack.toString().split(`
`);return"Error"==a[0]&&a.shift(),cD(a),cC.Kd=cB(),cC.ae=a,cC.Kd}function cF(a,b,c){if(a>>>=0,b>>>=0,cC.Kd==a)var d=cC.ae;else"Error"==(d=Error().stack.toString().split(`
`))[0]&&d.shift(),cD(d);for(var e=3;d[e]&&cB()!=a;)++e;for(a=0;a<c&&d[a+e];++a)M()[b+4*a>>>2>>>0]=cB();return a}var cG,cH={},cI=()=>{if(!cG){var a,b={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:("object"==typeof navigator&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(a in cH)void 0===cH[a]?delete b[a]:b[a]=cH[a];var c=[];for(a in b)c.push(`${a}=${b[a]}`);cG=c}return cG};function cJ(a,b){if(g)return ag(19,1,a,b);a>>>=0,b>>>=0;var c=0;return cI().forEach((d,e)=>{var f=b+c;for(e=N()[a+4*e>>>2>>>0]=f,f=0;f<d.length;++f)I()[e++>>>0]=d.charCodeAt(f);I()[e>>>0]=0,c+=d.length+1}),0}function cK(a,b){if(g)return ag(20,1,a,b);a>>>=0,b>>>=0;var c=cI();N()[a>>>2>>>0]=c.length;var d=0;return c.forEach(a=>d+=a.length+1),N()[b>>>2>>>0]=d,0}function cL(a){return g?ag(21,1,a):52}function cM(a,b,c,d){return g?ag(22,1,a,b,c,d):52}function cN(a,b,c,d){return g?ag(23,1,a,b,c,d):70}var cO=[null,[],[]];function cP(a,b,c,d){if(g)return ag(24,1,a,b,c,d);b>>>=0,c>>>=0,d>>>=0;for(var e=0,f=0;f<c;f++){var h=N()[b>>>2>>>0],i=N()[b+4>>>2>>>0];b+=8;for(var j=0;j<i;j++){var k=J()[h+j>>>0],l=cO[a];0===k||10===k?((1===a?q:r)(aJ(l)),l.length=0):l.push(k)}e+=i}return N()[d>>>2>>>0]=e,0}function cQ(a){return a>>>0}g||function(){for(var b=a.numThreads-1;b--;)ar();ad.unshift(()=>{var a;V++,a=()=>X(),g?a():Promise.all(ak.map(aq)).then(a)})}();for(var cR=Array(256),cS=0;256>cS;++cS)cR[cS]=String.fromCharCode(cS);a$=cR,a_=a.BindingError=class extends Error{constructor(a){super(a),this.name="BindingError"}},a.InternalError=class extends Error{constructor(a){super(a),this.name="InternalError"}},bb.push(0,1,void 0,1,null,1,!0,1,!1,1),a.count_emval_handles=()=>bb.length/2-5-ba.length;var cT,cU=[ah,ai,aG,aL,aM,aP,aQ,aR,aS,aT,aU,aV,aW,aX,aY,aZ,ci,cj,cm,cJ,cK,cL,cM,cN,cP];!async function(){function b(a,b){var c,d,e;return cT=a.exports,c=cT=function(){var a={};for(let[b,c]of Object.entries(cT))a[b]="function"==typeof c?(...a)=>{bN.push(b);try{return c(...a)}finally{G||(bN.pop(),bL&&1===bK&&0===bN.length&&(bK=0,af+=1,bJ(d$),"u">typeof Fibers&&Fibers.le()))}}:c;return a}(),d=a=>b=>a(b)>>>0,e=a=>()=>a()>>>0,(c=Object.assign({},c)).Cb=d(c.Cb),c.fc=e(c.fc),c.ic=d(c.ic),c.vc=d(c.vc),c.wc=e(c.wc),c.Ac=d(c.Ac),cT=c,am.push(cT.jc),t=b,X(),cT}V++;var d=Z();if(a.instantiateWasm)return new Promise(c=>{a.instantiateWasm(d,(a,d)=>{b(a,d),c(a.exports)})});if(g)return new Promise(a=>{Q=c=>{a(b(new WebAssembly.Instance(c,Z()),c))}});U??=a.locateFile?a.locateFile?a.locateFile("ort-wasm-simd-threaded.jsep.wasm",n):n+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm","file:///home/runner/work/veyra/veyra/src/node_modules/onnxruntime-web/dist/ort.webgpu.bundle.min.mjs").href;try{var e=await async function(a){if(!F&&"function"==typeof WebAssembly.instantiateStreaming&&!H(U))try{var b=fetch(U,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(b,a)}catch(a){r(`wasm streaming compile failed: ${a}`),r("falling back to ArrayBuffer instantiation")}return async function(a,b){try{var c=await async function(a){if(!F)try{var b=await j(a);return new Uint8Array(b)}catch{}if(a==U&&F)a=new Uint8Array(F);else{if(!k)throw"both async and sync fetching of the wasm failed";a=k(a)}return a}(a);return await WebAssembly.instantiate(c,b)}catch(a){r(`failed to asynchronously prepare wasm: ${a}`),Y(a)}}(U,a)}(d);return b(e.instance,e.module)}catch(a){return c(a),Promise.reject(a)}}();var cV=a=>(cV=cT.Cb)(a),cW=()=>(cW=cT.Db)();a._OrtInit=(b,c)=>(a._OrtInit=cT.Eb)(b,c),a._OrtGetLastError=(b,c)=>(a._OrtGetLastError=cT.Fb)(b,c),a._OrtCreateSessionOptions=(b,c,d,e,f,g,h,i,j,k)=>(a._OrtCreateSessionOptions=cT.Gb)(b,c,d,e,f,g,h,i,j,k),a._OrtAppendExecutionProvider=(b,c)=>(a._OrtAppendExecutionProvider=cT.Hb)(b,c),a._OrtAddFreeDimensionOverride=(b,c,d)=>(a._OrtAddFreeDimensionOverride=cT.Ib)(b,c,d),a._OrtAddSessionConfigEntry=(b,c,d)=>(a._OrtAddSessionConfigEntry=cT.Jb)(b,c,d),a._OrtReleaseSessionOptions=b=>(a._OrtReleaseSessionOptions=cT.Kb)(b),a._OrtCreateSession=(b,c,d)=>(a._OrtCreateSession=cT.Lb)(b,c,d),a._OrtReleaseSession=b=>(a._OrtReleaseSession=cT.Mb)(b),a._OrtGetInputOutputCount=(b,c,d)=>(a._OrtGetInputOutputCount=cT.Nb)(b,c,d),a._OrtGetInputName=(b,c)=>(a._OrtGetInputName=cT.Ob)(b,c),a._OrtGetOutputName=(b,c)=>(a._OrtGetOutputName=cT.Pb)(b,c),a._OrtFree=b=>(a._OrtFree=cT.Qb)(b),a._OrtCreateTensor=(b,c,d,e,f,g)=>(a._OrtCreateTensor=cT.Rb)(b,c,d,e,f,g),a._OrtGetTensorData=(b,c,d,e,f)=>(a._OrtGetTensorData=cT.Sb)(b,c,d,e,f),a._OrtReleaseTensor=b=>(a._OrtReleaseTensor=cT.Tb)(b),a._OrtCreateRunOptions=(b,c,d,e)=>(a._OrtCreateRunOptions=cT.Ub)(b,c,d,e),a._OrtAddRunConfigEntry=(b,c,d)=>(a._OrtAddRunConfigEntry=cT.Vb)(b,c,d),a._OrtReleaseRunOptions=b=>(a._OrtReleaseRunOptions=cT.Wb)(b),a._OrtCreateBinding=b=>(a._OrtCreateBinding=cT.Xb)(b),a._OrtBindInput=(b,c,d)=>(a._OrtBindInput=cT.Yb)(b,c,d),a._OrtBindOutput=(b,c,d,e)=>(a._OrtBindOutput=cT.Zb)(b,c,d,e),a._OrtClearBoundOutputs=b=>(a._OrtClearBoundOutputs=cT._b)(b),a._OrtReleaseBinding=b=>(a._OrtReleaseBinding=cT.$b)(b),a._OrtRunWithBinding=(b,c,d,e,f)=>(a._OrtRunWithBinding=cT.ac)(b,c,d,e,f),a._OrtRun=(b,c,d,e,f,g,h,i)=>(a._OrtRun=cT.bc)(b,c,d,e,f,g,h,i),a._OrtEndProfiling=b=>(a._OrtEndProfiling=cT.cc)(b),a._JsepOutput=(b,c,d)=>(a._JsepOutput=cT.dc)(b,c,d),a._JsepGetNodeName=b=>(a._JsepGetNodeName=cT.ec)(b);var cX=()=>(cX=cT.fc)(),cY=a._free=b=>(cY=a._free=cT.gc)(b),cZ=a._malloc=b=>(cZ=a._malloc=cT.ic)(b),c$=(a,b,c,d,e,f)=>(c$=cT.kc)(a,b,c,d,e,f),c_=()=>(c_=cT.lc)(),c0=(a,b,c,d,e)=>(c0=cT.mc)(a,b,c,d,e),c1=a=>(c1=cT.nc)(a),c2=a=>(c2=cT.oc)(a),c3=(a,b)=>(c3=cT.pc)(a,b),c4=()=>(c4=cT.qc)(),c5=(a,b)=>(c5=cT.rc)(a,b),c6=a=>(c6=cT.sc)(a),c7=(a,b)=>(c7=cT.tc)(a,b),c8=a=>(c8=cT.uc)(a),c9=a=>(c9=cT.vc)(a),da=()=>(da=cT.wc)(),db=a=>(db=cT.xc)(a),dc=a=>(dc=cT.yc)(a),dd=(a,b,c)=>(dd=cT.zc)(a,b,c),de=a=>(de=cT.Ac)(a),df=a.dynCall_iii=(b,c,d)=>(df=a.dynCall_iii=cT.Bc)(b,c,d),dg=a.dynCall_vi=(b,c)=>(dg=a.dynCall_vi=cT.Cc)(b,c),dh=a.dynCall_ii=(b,c)=>(dh=a.dynCall_ii=cT.Dc)(b,c),di=a.dynCall_vii=(b,c,d)=>(di=a.dynCall_vii=cT.Ec)(b,c,d),dj=a.dynCall_iiii=(b,c,d,e)=>(dj=a.dynCall_iiii=cT.Fc)(b,c,d,e),dk=a.dynCall_viii=(b,c,d,e)=>(dk=a.dynCall_viii=cT.Gc)(b,c,d,e),dl=a.dynCall_iiiii=(b,c,d,e,f)=>(dl=a.dynCall_iiiii=cT.Hc)(b,c,d,e,f),dm=a.dynCall_viiii=(b,c,d,e,f)=>(dm=a.dynCall_viiii=cT.Ic)(b,c,d,e,f),dn=a.dynCall_viiiiii=(b,c,d,e,f,g,h)=>(dn=a.dynCall_viiiiii=cT.Jc)(b,c,d,e,f,g,h),dp=a.dynCall_viiiiiii=(b,c,d,e,f,g,h,i)=>(dp=a.dynCall_viiiiiii=cT.Kc)(b,c,d,e,f,g,h,i),dq=a.dynCall_ji=(b,c)=>(dq=a.dynCall_ji=cT.Lc)(b,c),dr=a.dynCall_v=b=>(dr=a.dynCall_v=cT.Mc)(b),ds=a.dynCall_viiiii=(b,c,d,e,f,g)=>(ds=a.dynCall_viiiii=cT.Nc)(b,c,d,e,f,g),dt=a.dynCall_i=b=>(dt=a.dynCall_i=cT.Oc)(b),du=a.dynCall_fii=(b,c,d)=>(du=a.dynCall_fii=cT.Pc)(b,c,d),dv=a.dynCall_viiiiiiii=(b,c,d,e,f,g,h,i,j)=>(dv=a.dynCall_viiiiiiii=cT.Qc)(b,c,d,e,f,g,h,i,j),dw=a.dynCall_viiiiiiiiii=(b,c,d,e,f,g,h,i,j,k,l)=>(dw=a.dynCall_viiiiiiiiii=cT.Rc)(b,c,d,e,f,g,h,i,j,k,l),dx=a.dynCall_jiii=(b,c,d,e)=>(dx=a.dynCall_jiii=cT.Sc)(b,c,d,e),dy=a.dynCall_dii=(b,c,d)=>(dy=a.dynCall_dii=cT.Tc)(b,c,d),dz=a.dynCall_viiiiiiiii=(b,c,d,e,f,g,h,i,j,k)=>(dz=a.dynCall_viiiiiiiii=cT.Uc)(b,c,d,e,f,g,h,i,j,k),dA=a.dynCall_viiiiiiiiiii=(b,c,d,e,f,g,h,i,j,k,l,m)=>(dA=a.dynCall_viiiiiiiiiii=cT.Vc)(b,c,d,e,f,g,h,i,j,k,l,m),dB=a.dynCall_iiiiii=(b,c,d,e,f,g)=>(dB=a.dynCall_iiiiii=cT.Wc)(b,c,d,e,f,g),dC=a.dynCall_iij=(b,c,d)=>(dC=a.dynCall_iij=cT.Xc)(b,c,d),dD=a.dynCall_iiiiiiiiii=(b,c,d,e,f,g,h,i,j,k)=>(dD=a.dynCall_iiiiiiiiii=cT.Yc)(b,c,d,e,f,g,h,i,j,k),dE=a.dynCall_iiiiiiiiiii=(b,c,d,e,f,g,h,i,j,k,l)=>(dE=a.dynCall_iiiiiiiiiii=cT.Zc)(b,c,d,e,f,g,h,i,j,k,l),dF=a.dynCall_vij=(b,c,d)=>(dF=a.dynCall_vij=cT._c)(b,c,d),dG=a.dynCall_iiif=(b,c,d,e)=>(dG=a.dynCall_iiif=cT.$c)(b,c,d,e),dH=a.dynCall_iiij=(b,c,d,e)=>(dH=a.dynCall_iiij=cT.ad)(b,c,d,e),dI=a.dynCall_fiii=(b,c,d,e)=>(dI=a.dynCall_fiii=cT.bd)(b,c,d,e),dJ=a.dynCall_viiiiiiiiiiiii=(b,c,d,e,f,g,h,i,j,k,l,m,n,o)=>(dJ=a.dynCall_viiiiiiiiiiiii=cT.cd)(b,c,d,e,f,g,h,i,j,k,l,m,n,o),dK=a.dynCall_vjiii=(b,c,d,e,f)=>(dK=a.dynCall_vjiii=cT.dd)(b,c,d,e,f),dL=a.dynCall_vif=(b,c,d)=>(dL=a.dynCall_vif=cT.ed)(b,c,d),dM=a.dynCall_iiiiiii=(b,c,d,e,f,g,h)=>(dM=a.dynCall_iiiiiii=cT.fd)(b,c,d,e,f,g,h),dN=a.dynCall_iiiij=(b,c,d,e,f)=>(dN=a.dynCall_iiiij=cT.gd)(b,c,d,e,f),dO=a.dynCall_iiiiiiii=(b,c,d,e,f,g,h,i)=>(dO=a.dynCall_iiiiiiii=cT.hd)(b,c,d,e,f,g,h,i),dP=a.dynCall_viiiiiiiiiiii=(b,c,d,e,f,g,h,i,j,k,l,m,n)=>(dP=a.dynCall_viiiiiiiiiiii=cT.id)(b,c,d,e,f,g,h,i,j,k,l,m,n),dQ=a.dynCall_diii=(b,c,d,e)=>(dQ=a.dynCall_diii=cT.jd)(b,c,d,e),dR=a.dynCall_jiiii=(b,c,d,e,f)=>(dR=a.dynCall_jiiii=cT.kd)(b,c,d,e,f),dS=a.dynCall_viiij=(b,c,d,e,f)=>(dS=a.dynCall_viiij=cT.ld)(b,c,d,e,f),dT=a.dynCall_fiiii=(b,c,d,e,f)=>(dT=a.dynCall_fiiii=cT.md)(b,c,d,e,f),dU=a.dynCall_viiif=(b,c,d,e,f)=>(dU=a.dynCall_viiif=cT.nd)(b,c,d,e,f),dV=a.dynCall_diiii=(b,c,d,e,f)=>(dV=a.dynCall_diiii=cT.od)(b,c,d,e,f),dW=a.dynCall_viiid=(b,c,d,e,f)=>(dW=a.dynCall_viiid=cT.pd)(b,c,d,e,f),dX=a.dynCall_iiiijii=(b,c,d,e,f,g,h)=>(dX=a.dynCall_iiiijii=cT.qd)(b,c,d,e,f,g,h),dY=a.dynCall_iiiiiij=(b,c,d,e,f,g,h)=>(dY=a.dynCall_iiiiiij=cT.rd)(b,c,d,e,f,g,h),dZ=a=>(dZ=cT.sd)(a),d$=()=>(d$=cT.td)(),d_=a=>(d_=cT.ud)(a),d0=()=>(d0=cT.vd)();function d1(a,b,c){var d=da();try{di(a,b,c)}catch(a){if(c8(d),a!==a+0)throw a;c5(1,0)}}function d2(a,b,c){var d=da();try{return df(a,b,c)}catch(a){if(c8(d),a!==a+0)throw a;c5(1,0)}}function d3(a,b){var c=da();try{dg(a,b)}catch(a){if(c8(c),a!==a+0)throw a;c5(1,0)}}function d4(a,b){var c=da();try{return dh(a,b)}catch(a){if(c8(c),a!==a+0)throw a;c5(1,0)}}function d5(a,b,c,d){var e=da();try{return dj(a,b,c,d)}catch(a){if(c8(e),a!==a+0)throw a;c5(1,0)}}function d6(a,b,c,d,e){var f=da();try{dm(a,b,c,d,e)}catch(a){if(c8(f),a!==a+0)throw a;c5(1,0)}}function d7(a,b,c,d,e){var f=da();try{return dl(a,b,c,d,e)}catch(a){if(c8(f),a!==a+0)throw a;c5(1,0)}}function d8(a,b,c,d){var e=da();try{dk(a,b,c,d)}catch(a){if(c8(e),a!==a+0)throw a;c5(1,0)}}function d9(a,b,c,d,e,f,g){var h=da();try{return dM(a,b,c,d,e,f,g)}catch(a){if(c8(h),a!==a+0)throw a;c5(1,0)}}function ea(a){var b=da();try{dr(a)}catch(a){if(c8(b),a!==a+0)throw a;c5(1,0)}}function eb(a,b,c){var d=da();try{return dC(a,b,c)}catch(a){if(c8(d),a!==a+0)throw a;c5(1,0)}}function ec(a,b,c,d,e,f){var g=da();try{ds(a,b,c,d,e,f)}catch(a){if(c8(g),a!==a+0)throw a;c5(1,0)}}function ed(a,b,c){var d=da();try{dF(a,b,c)}catch(a){if(c8(d),a!==a+0)throw a;c5(1,0)}}function ee(a,b,c,d,e,f,g){var h=da();try{dn(a,b,c,d,e,f,g)}catch(a){if(c8(h),a!==a+0)throw a;c5(1,0)}}function ef(a,b,c,d,e,f,g,h){var i=da();try{dp(a,b,c,d,e,f,g,h)}catch(a){if(c8(i),a!==a+0)throw a;c5(1,0)}}function eg(a,b,c,d,e,f){var g=da();try{return dB(a,b,c,d,e,f)}catch(a){if(c8(g),a!==a+0)throw a;c5(1,0)}}function eh(a,b,c,d,e,f,g,h){var i=da();try{return dO(a,b,c,d,e,f,g,h)}catch(a){if(c8(i),a!==a+0)throw a;c5(1,0)}}function ei(a,b,c,d,e,f,g,h,i,j){var k=da();try{dz(a,b,c,d,e,f,g,h,i,j)}catch(a){if(c8(k),a!==a+0)throw a;c5(1,0)}}function ej(a,b,c,d,e,f,g,h,i){var j=da();try{dv(a,b,c,d,e,f,g,h,i)}catch(a){if(c8(j),a!==a+0)throw a;c5(1,0)}}function ek(a){var b=da();try{return dt(a)}catch(a){if(c8(b),a!==a+0)throw a;c5(1,0)}}function el(a,b,c,d,e,f,g,h,i,j){var k=da();try{return dD(a,b,c,d,e,f,g,h,i,j)}catch(a){if(c8(k),a!==a+0)throw a;c5(1,0)}}function em(a,b,c){var d=da();try{return du(a,b,c)}catch(a){if(c8(d),a!==a+0)throw a;c5(1,0)}}function en(a,b,c,d){var e=da();try{return dx(a,b,c,d)}catch(a){if(c8(e),a!==a+0)throw a;return c5(1,0),0n}}function eo(a,b,c){var d=da();try{return dy(a,b,c)}catch(a){if(c8(d),a!==a+0)throw a;c5(1,0)}}function ep(a,b,c,d,e,f,g,h,i,j,k,l){var m=da();try{dA(a,b,c,d,e,f,g,h,i,j,k,l)}catch(a){if(c8(m),a!==a+0)throw a;c5(1,0)}}function eq(a,b,c,d,e,f,g,h,i,j,k){var l=da();try{dw(a,b,c,d,e,f,g,h,i,j,k)}catch(a){if(c8(l),a!==a+0)throw a;c5(1,0)}}function er(a,b,c,d,e,f,g,h,i,j,k){var l=da();try{return dE(a,b,c,d,e,f,g,h,i,j,k)}catch(a){if(c8(l),a!==a+0)throw a;c5(1,0)}}function es(a,b,c,d){var e=da();try{return dG(a,b,c,d)}catch(a){if(c8(e),a!==a+0)throw a;c5(1,0)}}function et(a,b,c,d){var e=da();try{return dH(a,b,c,d)}catch(a){if(c8(e),a!==a+0)throw a;c5(1,0)}}function eu(a,b,c,d){var e=da();try{return dI(a,b,c,d)}catch(a){if(c8(e),a!==a+0)throw a;c5(1,0)}}function ev(a,b,c,d,e,f,g,h,i,j,k,l,m,n){var o=da();try{dJ(a,b,c,d,e,f,g,h,i,j,k,l,m,n)}catch(a){if(c8(o),a!==a+0)throw a;c5(1,0)}}function ew(a,b,c,d,e){var f=da();try{dK(a,b,c,d,e)}catch(a){if(c8(f),a!==a+0)throw a;c5(1,0)}}function ex(a,b,c){var d=da();try{dL(a,b,c)}catch(a){if(c8(d),a!==a+0)throw a;c5(1,0)}}function ey(a,b){var c=da();try{return dq(a,b)}catch(a){if(c8(c),a!==a+0)throw a;return c5(1,0),0n}}function ez(a,b,c,d,e){var f=da();try{return dN(a,b,c,d,e)}catch(a){if(c8(f),a!==a+0)throw a;c5(1,0)}}function eA(a,b,c,d,e,f,g,h,i,j,k,l,m){var n=da();try{dP(a,b,c,d,e,f,g,h,i,j,k,l,m)}catch(a){if(c8(n),a!==a+0)throw a;c5(1,0)}}function eB(a,b,c,d){var e=da();try{return dQ(a,b,c,d)}catch(a){if(c8(e),a!==a+0)throw a;c5(1,0)}}function eC(a,b,c,d,e){var f=da();try{return dR(a,b,c,d,e)}catch(a){if(c8(f),a!==a+0)throw a;return c5(1,0),0n}}function eD(a,b,c,d,e){var f=da();try{dS(a,b,c,d,e)}catch(a){if(c8(f),a!==a+0)throw a;c5(1,0)}}function eE(a,b,c,d,e){var f=da();try{return dT(a,b,c,d,e)}catch(a){if(c8(f),a!==a+0)throw a;c5(1,0)}}function eF(a,b,c,d,e){var f=da();try{dU(a,b,c,d,e)}catch(a){if(c8(f),a!==a+0)throw a;c5(1,0)}}function eG(a,b,c,d,e){var f=da();try{return dV(a,b,c,d,e)}catch(a){if(c8(f),a!==a+0)throw a;c5(1,0)}}function eH(a,b,c,d,e){var f=da();try{dW(a,b,c,d,e)}catch(a){if(c8(f),a!==a+0)throw a;c5(1,0)}}function eI(a,b,c,d,e,f,g){var h=da();try{return dX(a,b,c,d,e,f,g)}catch(a){if(c8(h),a!==a+0)throw a;c5(1,0)}}function eJ(a,b,c,d,e,f,g){var h=da();try{return dY(a,b,c,d,e,f,g)}catch(a){if(c8(h),a!==a+0)throw a;c5(1,0)}}return a.stackSave=()=>da(),a.stackRestore=a=>c8(a),a.stackAlloc=a=>c9(a),a.setValue=function(a,b,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":I()[a>>>0]=b;break;case"i16":K()[a>>>1>>>0]=b;break;case"i32":M()[a>>>2>>>0]=b;break;case"i64":C[a>>>3]=BigInt(b);break;case"float":O()[a>>>2>>>0]=b;break;case"double":P()[a>>>3>>>0]=b;break;case"*":N()[a>>>2>>>0]=b;break;default:Y(`invalid type for setValue: ${c}`)}},a.getValue=function(a,b="i8"){switch(b.endsWith("*")&&(b="*"),b){case"i1":case"i8":return I()[a>>>0];case"i16":return K()[a>>>1>>>0];case"i32":return M()[a>>>2>>>0];case"i64":return C[a>>>3];case"float":return O()[a>>>2>>>0];case"double":return P()[a>>>3>>>0];case"*":return N()[a>>>2>>>0];default:Y(`invalid type for getValue: ${b}`)}},a.UTF8ToString=aK,a.stringToUTF8=aO,a.lengthBytesUTF8=aN,function c(){if(0<V)W=c;else if(g)b(a),T();else{for(;0<ad.length;)ad.shift()(a);0<V?W=c:(a.calledRun=!0,G||(T(),b(a)))}}(),a.PTR_SIZE=4,d},globalThis.self?.name?.startsWith("em-pthread")&&ap()}),fe=O(()=>{aj(),ar=typeof location>"u"?void 0:location.origin,as="file:///home/runner/work/veyra/veyra/src/node_modules/onnxruntime-web/dist/ort.webgpu.bundle.min.mjs".startsWith("file:")?new URL(new URL("ort.webgpu.bundle.min.mjs","file:///home/runner/work/veyra/veyra/src/node_modules/onnxruntime-web/dist/ort.webgpu.bundle.min.mjs").href,ar).href:"file:///home/runner/work/veyra/veyra/src/node_modules/onnxruntime-web/dist/ort.webgpu.bundle.min.mjs",at=()=>{if(as&&!as.startsWith("blob:"))return as.substring(0,as.lastIndexOf("/")+1)},au=(a,b)=>{try{let c=b??as;return(c?new URL(a,c):new URL(a)).origin===ar}catch{return!1}},av=async a=>{let b=await (await fetch(a,{credentials:"same-origin"})).blob();return URL.createObjectURL(b)},aw=async a=>(await import(a)).default,ax=(an(),Q(ak)).default,ay=async()=>{if(!as)throw Error("Failed to load proxy worker: cannot determine the script source URL.");if(au(as))return[void 0,ax()];let a=await av(as);return[a,ax(a)]},az=(fd(),Q(ao)).default,aA=async(a,b,c)=>{if(!a&&!b&&az&&as&&au(as))return[void 0,az];{let d,e,f="ort-wasm-simd-threaded.jsep.mjs",g=a??((a,b)=>{let c=b??as;try{return(c?new URL(a,c):new URL(a)).href}catch{return}})(f,b),h=c&&g&&!au(g,b),i=h?await av(g):g??(d=f,e=b,`${e??"./"}${d}`);return[h?i:void 0,await aw(i)]}}}),ff=O(()=>{fe(),aC=!1,aD=!1,aE=!1,aF=async a=>{if(aC)return Promise.resolve();if(aD)throw Error("multiple calls to 'initializeWebAssembly()' detected.");if(aE)throw Error("previous call to 'initializeWebAssembly()' failed.");aD=!0;let b=a.initTimeout,c=a.numThreads;if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}})())throw Error("WebAssembly SIMD is not supported in the current environment.");let d=(()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return"u">typeof MessageChannel&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}})();c>1&&!d&&("u">typeof self&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+c+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),a.numThreads=c=1);let e=a.wasmPaths,f="string"==typeof e?e:void 0,g=e?.mjs,h=g?.href??g,i=e?.wasm,j=i?.href??i,k=a.wasmBinary,[l,m]=await aA(h,f,c>1),n=!1,o=[];if(b>0&&o.push(new Promise(a=>{setTimeout(()=>{n=!0,a()},b)})),o.push(new Promise((a,b)=>{let d={numThreads:c};if(k)d.wasmBinary=k;else if(j||f)d.locateFile=a=>j??f+a;else if(h&&0!==h.indexOf("blob:"))d.locateFile=a=>new URL(a,h).href;else if(l){let a=at();a&&(d.locateFile=b=>a+b)}m(d).then(b=>{aD=!1,aC=!0,aB=b,a(),l&&URL.revokeObjectURL(l)},a=>{aD=!1,aE=!0,b(a)})})),await Promise.race(o),n)throw Error(`WebAssembly backend initializing failed due to timeout: ${b}ms`)},aG=()=>{if(aC&&aB)return aB;throw Error("WebAssembly is not initialized yet.")}}),fg=O(()=>{ff(),aH=(a,b)=>{let c=aG(),d=c.lengthBytesUTF8(a)+1,e=c._malloc(d);return c.stringToUTF8(a,e,d),b.push(e),e},aI=(a,b,c,d)=>{if("object"==typeof a&&null!==a){if(c.has(a))throw Error("Circular reference in options");c.add(a)}Object.entries(a).forEach(([a,e])=>{let f=b?b+a:a;if("object"==typeof e)aI(e,f+".",c,d);else if("string"==typeof e||"number"==typeof e)d(f,e.toString());else if("boolean"==typeof e)d(f,e?"1":"0");else throw Error(`Can't handle extra config type: ${typeof e}`)})},aJ=a=>{let b=aG(),c=b.stackSave();try{let c=b.PTR_SIZE,d=b.stackAlloc(2*c);b._OrtGetLastError(d,d+c);let e=Number(b.getValue(d,4===c?"i32":"i64")),f=b.getValue(d+c,"*"),g=f?b.UTF8ToString(f):"";throw Error(`${a} ERROR_CODE: ${e}, ERROR_MESSAGE: ${g}`)}finally{b.stackRestore(c)}}}),fh=O(()=>{ff(),fg(),aK=a=>{let b=aG(),c=0,d=[],e=a||{};try{if(a?.logSeverityLevel===void 0)e.logSeverityLevel=2;else if("number"!=typeof a.logSeverityLevel||!Number.isInteger(a.logSeverityLevel)||a.logSeverityLevel<0||a.logSeverityLevel>4)throw Error(`log serverity level is not valid: ${a.logSeverityLevel}`);if(a?.logVerbosityLevel===void 0)e.logVerbosityLevel=0;else if("number"!=typeof a.logVerbosityLevel||!Number.isInteger(a.logVerbosityLevel))throw Error(`log verbosity level is not valid: ${a.logVerbosityLevel}`);a?.terminate===void 0&&(e.terminate=!1);let f=0;return a?.tag!==void 0&&(f=aH(a.tag,d)),c=b._OrtCreateRunOptions(e.logSeverityLevel,e.logVerbosityLevel,!!e.terminate,f),0===c&&aJ("Can't create run options."),a?.extra!==void 0&&aI(a.extra,"",new WeakSet,(a,e)=>{let f=aH(a,d),g=aH(e,d);0!==b._OrtAddRunConfigEntry(c,f,g)&&aJ(`Can't set a run config entry: ${a} - ${e}.`)}),[c,d]}catch(a){throw 0!==c&&b._OrtReleaseRunOptions(c),d.forEach(a=>b._free(a)),a}}}),fi=O(()=>{ff(),fg(),aL=a=>{var b;let c,d=aG(),e=0,f=[],g=a||{};(b=g).extra||(b.extra={}),b.extra.session||(b.extra.session={}),(c=b.extra.session).use_ort_model_bytes_directly||(c.use_ort_model_bytes_directly="1"),b.executionProviders&&b.executionProviders.some(a=>("string"==typeof a?a:a.name)==="webgpu")&&(b.enableMemPattern=!1);try{let a=(a=>{switch(a){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw Error(`unsupported graph optimization level: ${a}`)}})(g.graphOptimizationLevel??"all"),b=(a=>{switch(a){case"sequential":return 0;case"parallel":return 1;default:throw Error(`unsupported execution mode: ${a}`)}})(g.executionMode??"sequential"),c="string"==typeof g.logId?aH(g.logId,f):0,h=g.logSeverityLevel??2;if(!Number.isInteger(h)||h<0||h>4)throw Error(`log serverity level is not valid: ${h}`);let i=g.logVerbosityLevel??0;if(!Number.isInteger(i)||i<0||i>4)throw Error(`log verbosity level is not valid: ${i}`);let j="string"==typeof g.optimizedModelFilePath?aH(g.optimizedModelFilePath,f):0;if(e=d._OrtCreateSessionOptions(a,!!g.enableCpuMemArena,!!g.enableMemPattern,b,!!g.enableProfiling,0,c,h,i,j),0===e&&aJ("Can't create session options."),g.executionProviders&&((a,b,c)=>{for(let d of b){let b="string"==typeof d?d:d.name;switch(b){case"webnn":if(b="WEBNN","string"!=typeof d){let b=d?.deviceType;if(b){let d=aH("deviceType",c),e=aH(b,c);0!==aG()._OrtAddSessionConfigEntry(a,d,e)&&aJ(`Can't set a session config entry: 'deviceType' - ${b}.`)}}break;case"webgpu":if(b="JS","string"!=typeof d&&d?.preferredLayout){if("NCHW"!==d.preferredLayout&&"NHWC"!==d.preferredLayout)throw Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${d.preferredLayout}`);let b=aH("preferredLayout",c),e=aH(d.preferredLayout,c);0!==aG()._OrtAddSessionConfigEntry(a,b,e)&&aJ(`Can't set a session config entry: 'preferredLayout' - ${d.preferredLayout}.`)}break;case"wasm":case"cpu":continue;default:throw Error(`not supported execution provider: ${b}`)}let e=aH(b,c);0!==aG()._OrtAppendExecutionProvider(a,e)&&aJ(`Can't append execution provider: ${b}.`)}})(e,g.executionProviders,f),void 0!==g.enableGraphCapture){if("boolean"!=typeof g.enableGraphCapture)throw Error(`enableGraphCapture must be a boolean value: ${g.enableGraphCapture}`);let a=aH("enableGraphCapture",f),b=aH(g.enableGraphCapture.toString(),f);0!==d._OrtAddSessionConfigEntry(e,a,b)&&aJ(`Can't set a session config entry: 'enableGraphCapture' - ${g.enableGraphCapture}.`)}if(g.freeDimensionOverrides)for(let[a,b]of Object.entries(g.freeDimensionOverrides)){if("string"!=typeof a)throw Error(`free dimension override name must be a string: ${a}`);if("number"!=typeof b||!Number.isInteger(b)||b<0)throw Error(`free dimension override value must be a non-negative integer: ${b}`);let c=aH(a,f);0!==d._OrtAddFreeDimensionOverride(e,c,b)&&aJ(`Can't set a free dimension override: ${a} - ${b}.`)}return void 0!==g.extra&&aI(g.extra,"",new WeakSet,(a,b)=>{let c=aH(a,f),g=aH(b,f);0!==d._OrtAddSessionConfigEntry(e,c,g)&&aJ(`Can't set a session config entry: ${a} - ${b}.`)}),[e,f]}catch(a){throw 0!==e&&0!==d._OrtReleaseSessionOptions(e)&&aJ("Can't release session options."),f.forEach(a=>d._free(a)),a}}}),fj=O(()=>{aM=a=>{switch(a){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw Error(`unsupported data type: ${a}`)}},aN=a=>{switch(a){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw Error(`unsupported data type: ${a}`)}},aO=(a,b)=>{let c=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][a],d="number"==typeof b?b:b.reduce((a,b)=>a*b,1);return c>0?Math.ceil(d*c):void 0},aP=a=>{switch(a){case"float16":return"u">typeof Float16Array&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":case"bool":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw Error(`unsupported type: ${a}`)}},aQ=a=>{switch(a){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw Error(`unsupported logging level: ${a}`)}},aR=a=>"float32"===a||"float16"===a||"int32"===a||"int64"===a||"uint32"===a||"uint8"===a||"bool"===a||"uint4"===a||"int4"===a,aS=a=>"float32"===a||"float16"===a||"int32"===a||"int64"===a||"uint32"===a||"uint64"===a||"int8"===a||"uint8"===a||"bool"===a||"uint4"===a||"int4"===a,aT=a=>{switch(a){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw Error(`unsupported data location: ${a}`)}}}),fk=O(()=>{aj(),aU=async a=>{if("string"!=typeof a)return a instanceof Blob?new Uint8Array(await a.arrayBuffer()):a instanceof Uint8Array?a:new Uint8Array(a);{let b=await fetch(a);if(!b.ok)throw Error(`failed to load external data file: ${a}`);let c=b.headers.get("Content-Length"),d=c?parseInt(c,10):0;if(d<0x40000000)return new Uint8Array(await b.arrayBuffer());{if(!b.body)throw Error(`failed to load external data file: ${a}, no response body.`);let c=b.body.getReader(),e;try{e=new ArrayBuffer(d)}catch(a){if(a instanceof RangeError){let a=Math.ceil(d/65536);e=new WebAssembly.Memory({initial:a,maximum:a}).buffer}else throw a}let f=0;for(;;){let{done:a,value:b}=await c.read();if(a)break;let d=b.byteLength;new Uint8Array(e,f,d).set(b),f+=d}return new Uint8Array(e,0,d)}}}}),fl=O(()=>{fj(),aV=["V","I","W","E","F"],aY=(a,b)=>{aW=a,aX=b},aZ=(...a)=>{aX&&((a,b)=>{var c,d;let e=aQ(a);e>=aQ(aW)&&(c=e,d="function"==typeof b?b():b,console.log(`[${aV[c]},${new Date().toISOString()}]${d}`))})(...a)}}),fm=O(()=>{fj(),a$=(a,b)=>new(aP(b))(a)}),fn=O(()=>{}),fo=O(()=>{fl(),fn(),a_=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[0xc00000,10],[0x1000000,10],[0x1900000,15],[0x2000000,22],[0x2a30000,2],[0x3840000,6],[0x4000000,6],[0x8000000,6],[0xa000000,6]]),a0=[],a1=a=>16*Math.ceil(Number(a)/16),a2=1,a3=()=>a2++,a4=async(a,b,c,d)=>{let e=a1(c),f=a.device.createBuffer({size:e,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let g=a.getCommandEncoder();a.endComputePass(),g.copyBufferToBuffer(b,0,f,0,e),a.flush(),await f.mapAsync(GPUMapMode.READ);let h=f.getMappedRange();if(!d)return new Uint8Array(h.slice(0,c));{let a=d();return a.set(new Uint8Array(h,0,c)),a}}finally{f.destroy()}},a5=class{constructor(a){for(let[b]of(this.backend=a,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map,a_))a0.push(b),this.freeBuffers.set(b,[]),this.freeUniformBuffers.set(b,[]);this.sessionCount=0}upload(a,b){let c=b.buffer,d=b.byteOffset,e=b.byteLength,f=a1(e),g=this.storageCache.get(a);if(!g)throw Error("gpu data for uploading does not exist");if(Number(g.originalSize)!==e)throw Error(`inconsistent data size. gpu data size=${g.originalSize}, data size=${e}`);let h=this.backend.device.createBuffer({mappedAtCreation:!0,size:f,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC});new Uint8Array(h.getMappedRange()).set(new Uint8Array(c,d,e)),h.unmap();let i=this.backend.device.createCommandEncoder();i.copyBufferToBuffer(h,0,g.gpuData.buffer,0,f),this.backend.device.queue.submit([i.finish()]),h.destroy(),aZ("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${a})`)}memcpy(a,b){let c=this.storageCache.get(a);if(!c)throw Error("source gpu data for memcpy does not exist");let d=this.storageCache.get(b);if(!d)throw Error("destination gpu data for memcpy does not exist");if(c.originalSize!==d.originalSize)throw Error("inconsistent source and destination gpu data size");let e=a1(c.originalSize),f=this.backend.getCommandEncoder();this.backend.endComputePass(),f.copyBufferToBuffer(c.gpuData.buffer,0,d.gpuData.buffer,0,e)}registerExternalBuffer(a,b,c){let d;if(c){if(d=c[0],a===c[1])return aZ("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${b}) => id=${d}, buffer is the same, skip.`),d;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else d=a3();return this.storageCache.set(d,{gpuData:{id:d,type:0,buffer:a},originalSize:b}),aZ("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${b}) => id=${d}, registered.`),d}unregisterExternalBuffer(a){void 0!==a&&(this.storageCache.delete(a),aZ("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${a}`))}create(a,b=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let c=(a=>{for(let b=0;b<a0.length;b++){let c=a0[b];if(a<=c)return c}return 16*Math.ceil(a/16)})(a),d,e=(b&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,f=(b&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(e||f){let a=(e?this.freeBuffers:this.freeUniformBuffers).get(c);d=a&&a.length>0?a.pop():this.backend.device.createBuffer({size:c,usage:b})}else d=this.backend.device.createBuffer({size:c,usage:b});let g={id:a3(),type:0,buffer:d};return this.storageCache.set(g.id,{gpuData:g,originalSize:Number(a)}),aZ("verbose",()=>`[WebGPU] GpuDataManager.create(size=${a}) => id=${g.id}`),g}get(a){return this.storageCache.get(a)?.gpuData}release(a){let b="bigint"==typeof a?Number(a):a,c=this.storageCache.get(b);if(!c){if(0===this.storageCache.size)return 0;throw Error("releasing data does not exist")}return aZ("verbose",()=>`[WebGPU] GpuDataManager.release(id=${b}), gpuDataId=${c.gpuData.id}`),this.storageCache.delete(b),this.buffersPending.push(c.gpuData.buffer),c.originalSize}async download(a,b){let c=this.storageCache.get(Number(a));if(!c)throw Error("data does not exist");await a4(this.backend,c.gpuData.buffer,c.originalSize,b)}refreshPendingBuffers(){if(0!==this.buffersPending.length)if("default"===this.backend.sessionStatus){for(let a of this.buffersPending){let b=a_.get(a.size);if((a.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let c=this.freeBuffers.get(a.size)||[];void 0===b||c.length>=b?a.destroy():c.push(a)}else if((a.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let c=this.freeUniformBuffers.get(a.size)||[];void 0===b||c.length>=b?a.destroy():c.push(a)}else a.destroy()}this.buffersPending=[]}else{let a=this.capturedPendingBuffers.get(this.backend.currentSessionId);for(let b of(a||(a=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,a)),this.buffersPending))a.push(b);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(a=>{a.forEach(a=>{a.destroy()})}),this.freeUniformBuffers.forEach(a=>{a.forEach(a=>{a.destroy()})}),this.storageCache.forEach(a=>{a.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(a=>{a.forEach(a=>{a.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(a){let b=this.capturedPendingBuffers.get(a);b&&(b.forEach(a=>{a.destroy()}),this.capturedPendingBuffers.delete(a)),this.sessionCount-=1,0===this.sessionCount&&(aZ("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(a=>{a.gpuData.buffer.destroy()}),this.storageCache=new Map)}},a6=(...a)=>new a5(...a)}),fp=O(()=>{a7=class{constructor(a){Object.assign(this,a)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(a=>`${this[a]}`).join(";")),this.key}},a8=a=>new a7(a)}),fq=O(()=>{a9=class{static calcMatMulShape(a,b){return a[1]!==b[0]?void 0:[a[0],b[1]]}},ba=class{static calcShape(a,b,c=!1){let d=a.length,e=b.length;if(0===d)return b;if(0===e)return a;let f=Math.max(a.length,b.length),g=Array(f);if(c){if(d<2||e<2)return;let c=a9.calcMatMulShape([a[d-2],a[d-1]],[b[e-2],b[e-1]]);if(void 0===c)return;[g[f-2],g[f-1]]=c}for(let h=c?3:1;h<=f;h++){let c=d-h<0?1:a[d-h],i=e-h<0?1:b[e-h];if(c!==i&&c>1&&i>1)return;let j=Math.max(c,i);if(c&&i)g[f-h]=Math.max(c,i);else{if(j>1)return;g[f-h]=0}}return g}static isValidBroadcast(a,b){let c=a.length,d=b.length;if(c>d)return!1;for(let e=1;e<=c;e++)if(1!==a[c-e]&&a[c-e]!==b[d-e])return!1;return!0}},bb=class a{static size(b){return a.getSizeFromDimensionRange(b,0,b.length)}static convertShape(a,b=4){let c=a.length;if(0===c)return[];let d=Array(c),e=c-1;for(;e>=0;){if(a[e]%b==0){d[e]=a[e]/b;break}if(b%a[e]!=0)throw Error("cannot convert shape");d[e]=1,b/=a[e],e--}for(e--;e>=0;e--)d[e]=a[e];return d}static sizeFromDimension(b,c){if(c<0||c>b.length)throw Error(`invalid dimension of ${c} for sizeFromDimension as Tensor has ${b.length} dimensions.`);return a.getSizeFromDimensionRange(b,c,b.length)}static sizeToDimension(b,c){if(c<0||c>b.length)throw Error(`invalid dimension of ${c} for sizeToDimension as Tensor has ${b.length} dimensions.`);return a.getSizeFromDimensionRange(b,0,c)}static getSizeFromDimensionRange(a,b,c){let d=1;for(let e=b;e<c;e++){if(a[e]<0)throw Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");d*=Number(a[e])}return d}static computeStrides(a){let b=a.length;if(0===b)return[];if(1===b)return[1];let c=Array(b);c[b-1]=1,c[b-2]=a[b-1];for(let d=b-3;d>=0;--d)c[d]=c[d+1]*a[d+1];return c}static normalizeAxis(a,b){if(a<-b&&a>=b)throw Error("unsupported axis for this operation.");return a<0?a+b:a}static normalizeAxes(a,b){return a.map(c=>this.normalizeAxis(c,b??a.length))}static sortBasedOnPerm(a,b){return b?b.map(b=>a[b]):a.slice().reverse()}static padShape(a,b){let c=a.length;return a.map((a,d)=>a+b[d]+b[d+c])}static areEqual(a,b){return a.length===b.length&&a.every((a,c)=>a===b[c])}},bc=class a{static adjustPoolAttributes(a,b,c,d,e,f){if(!a&&c.length!==b.length-2)throw Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(a)for(let a=0;a<b.length-2;a++)a>=c.length?c.push(b[a+2]):c[a]=b[a+2];for(let a=0;a<c.length;a++)if(a<d.length){if(d[a]<0)throw Error("strides should be greater than or equal to 1")}else d.push(1);for(let a=0;a<c.length;a++)if(a<e.length){if(e[a]<0)throw Error("dilations should be greater than or equal to 1")}else e.push(1);for(let a=0;a<2*c.length;a++)if(a<f.length){if(f[a]<0)throw Error("pad should be greater than or equal to 1")}else f.push(0);for(let a=0;a<c.length;a++){if(c[a]<=0)throw Error("kernel shapes need to be greater than 0");if(f[a]>=c[a]||f[a+c.length]>=c[a])throw Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(b,c,d,e,f,g,h){if(h){if(f.length!==2*(b.length-2))throw Error("length of pads should be twice the length of data dimensions");if(c.length!==b.length-2)throw Error("length of strides should be the length of data dimensions");if(e.length!==b.length-2)throw Error("length of kernel shapes should be the length of data dimensions");for(let i=0;i<b.length-2;i++)a.adjustPadAndReturnShape(b[i+(g?1:2)],c[i],d[i],e[i],f,i,i+b.length-2,h)}}static computePoolOutputShape(b,c,d,e,f,g,h){if(c.length<=0)throw Error("input shape must be of size greater than 0");let i=[c[0],c[1]];return a.computeShapeHelper(b,c,i,d,e,f,g,h),i}static computeConvOutputShape(b,c,d,e,f,g,h){if(b.length<=0||c.length<=0)throw Error("invalid input tensor dims or invalid filter tensor dims");let i=[b[0],c[0]];return a.computeShapeHelper(!1,b,i,d,e,f,g,h),i}static computeShapeHelper(b,c,d,e,f,g,h,i){if(b)for(let a=0;a<c.length-2;a++)d.push(1);else for(let b=0;b<c.length-2;b++)d.push(a.adjustPadAndReturnShape(c[b+2],e[b],f[b],g[b],h,b,b+c.length-2,i))}static adjustPadAndReturnShape(a,b,c,d,e,f,g,h){let i=c*(d-1)+1;if(!h||"NOTSET"===h)return Math.floor((a+e[f]+e[g]-i)/b+1);switch(h){case"VALID":return e[f]=0,e[g]=0,Math.floor((a-i)/b+1);case"SAME_LOWER":case"SAME_UPPER":if(1!==c)throw Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((a+b-1)/b-1)*b+d-a;return e[f]=Math.floor("SAME_LOWER"===h?(c+1)/2:c/2),e[g]=c-e[f],Math.floor((a+c-d)/b+1)}default:throw Error("Unsupported AutoPad type")}}},bd=class{static getShapeOfGemmResult(a,b,c,d,e){let f,g,h;if(2!==a.length||2!==c.length)throw Error("shape need to be of size 2");b?(f=a[1],g=a[0]):(f=a[0],g=a[1]);let i=-1;if(d?(h=c[0],i=1):(h=c[1],i=0),c[i]!==g)throw Error("dimension mismatch");if(f<=0||h<=0||g<=0)throw Error("invalid shape specified");if(e&&!ba.isValidBroadcast(e,[f,h]))throw Error("gemm: invalid bias shape for broadcast");return[f,h,g]}},be=-34028234663852886e22,bf=34028234663852886e22}),fr=O(()=>{fj(),fq(),bg=64,bh=(a,b)=>{if(3===b)throw Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(a)){case 10:return b>1?`vec${b}<f16>`:"f16";case 1:return b>1?`vec${b}<f32>`:"f32";case 6:return b>1?`vec${b}<i32>`:"i32";case 12:return b>1?`vec${b}<u32>`:"u32";case 7:if(b>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(b>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(4!==b)throw Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw Error(`Unknown data type: ${a}`)}},bi=(a,b=1)=>{let c=bh(a,b);return"string"==typeof c?c:c[0]},bj=(a,b=1)=>{let c=bh(a,b);return"string"==typeof c?c:c[1]},bk=(...a)=>{let b=[];return a.forEach(a=>{0!==a.length&&b.push({type:12,data:a},{type:12,data:bb.computeStrides(a)})}),b},bl=a=>a%4==0?4:a%2==0?2:1,bm=(a="f32",b,c="0")=>b&&1!==b?`vec${b}<${a}>(${c})`:`${a}(${c})`,bn=(a,b,c)=>"f32"===a?c:1===b?`f32(${c})`:`vec${b}<f32>(${c})`,bo=(a,b)=>4===b?`(${a}.x + ${a}.y + ${a}.z + ${a}.w)`:2===b?`(${a}.x + ${a}.y)`:3===b?`(${a}.x + ${a}.y + ${a}.z)`:a,bp=(a,b,c,d)=>a.startsWith("uniforms.")&&c>4?"string"==typeof b?"f16"===d?`${a}[(${b}) / 8][(${b}) % 8 / 4][(${b}) % 8 % 4]`:`${a}[(${b}) / 4][(${b}) % 4]`:"f16"===d?`${a}[${Math.floor(b/8)}][${Math.floor(b%8/4)}][${b%8%4}]`:`${a}[${Math.floor(b/4)}][${b%4}]`:c>1?`${a}[${b}]`:a,bq=(a,b,c,d,e)=>{let f,g,h,i,j="number"==typeof c,k=j?c:c.length,l=[...Array(k).keys()],m=k<2?"u32":k<=4?`vec${k}<u32>`:`array<u32, ${k}>`,n=bh(b,e),o="string"==typeof n?n:n[1],p={indices:m,value:o,storage:"string"==typeof n?n:n[0],tensor:b},q=a=>"string"==typeof a?a:`${a}u`,r={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},s=j?"uniforms.":"",t=`${s}${a}_shape`,u=`${s}${a}_strides`,v="";for(let a=0;a<k-1;a++)v+=`
    let dim${a} = current / ${bp(u,a,k)};
    let rest${a} = current % ${bp(u,a,k)};
    indices[${a}] = dim${a};
    current = rest${a};
    `;v+=`indices[${k-1}] = current;`;let w=k<2?"":`
  fn o2i_${a}(offset: u32) -> ${p.indices} {
    var indices: ${p.indices};
    var current = offset;
    ${v}
    return indices;
  }`,x=[];if(k>=2)for(let a=k-1;a>=0;a--)x.push(`${bp(u,a,k)} * (indices[${a}])`);let y=k<2?"":`
  fn i2o_${a}(indices: ${p.indices}) -> u32 {
    return ${x.join("+")};
  }`,z=(...a)=>0===k?"0u":`${p.indices}(${a.map(q).join(",")})`,A=(a,b)=>k<2?`${a}`:`${bp(a,b,k)}`,B={},C=(b,c)=>(()=>{if(p.storage===p.value)return`${a}[${b}]=${c};`;if("vec2<u32>"===p.storage&&"i32"===p.value)return`${a}[${b}]=vec2<u32>(u32(${c}), select(0u, 0xFFFFFFFFu, ${c} < 0));`;if("vec2<u32>"===p.storage&&"u32"===p.value)return`${a}[${b}]=vec2<u32>(u32(${c}), 0u);`;if("u32"===p.storage&&"vec4<bool>"===p.value)return`${a}[${b}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${c}));`;throw Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),D=b=>(()=>{if(p.storage===p.value)return`${a}[${b}]`;if("vec2<u32>"===p.storage&&"i32"===p.value)return`i32(${a}[${b}].x)`;if("vec2<u32>"===p.storage&&"u32"===p.value)return`u32(${a}[${b}].x)`;if("u32"===p.storage&&"vec4<bool>"===p.value)return`vec4<bool>(bool(${a}[${b}] & 0xFFu), bool(${a}[${b}] & 0xFF00u), bool(${a}[${b}] & 0xFF0000u), bool(${a}[${b}] & 0xFF000000u))`;throw Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),E=k<2?"":`
  fn get_${a}ByIndices(indices: ${p.indices}) -> ${o} {
    return ${D(`i2o_${a}(indices)`)};
  }`,F=k<2?"":(f=l.map(a=>`d${a}: u32`).join(", "),g=l.map(a=>`d${a}`).join(", "),`
  fn get_${a}(${f}) -> ${o} {
    return get_${a}ByIndices(${z(g)});
  }`),G=k<2?"":`
  fn set_${a}ByIndices(indices: ${p.indices}, value: ${o}) {
    ${C(`i2o_${a}(indices)`,"value")}
  }`,H=k<2?"":(h=l.map(a=>`d${a}: u32`).join(", "),i=l.map(a=>`d${a}`).join(", "),`
  fn set_${a}(${h}, value: ${o}) {
    set_${a}ByIndices(${z(i)}, value);
  }`);return{impl:()=>{let a=[],b=!1;return r.offsetToIndices&&(a.push(w),b=!0),r.indicesToOffset&&(a.push(y),b=!0),r.broadcastedIndicesToOffset&&(Object.values(B).forEach(b=>a.push(b)),b=!0),r.set&&(a.push(H),b=!0),r.setByIndices&&(a.push(G),b=!0),r.get&&(a.push(F),b=!0),r.getByIndices&&(a.push(E),b=!0),!j&&b&&a.unshift(`const ${t} = ${p.indices}(${c.join(",")});`,`const ${u} = ${p.indices}(${bb.computeStrides(c).join(",")});`),a.join(`
`)},type:p,offsetToIndices:b=>(r.offsetToIndices=!0,k<2?b:`o2i_${a}(${b})`),indicesToOffset:b=>(r.indicesToOffset=!0,k<2?b:`i2o_${a}(${b})`),broadcastedIndicesToOffset:(b,c)=>{r.broadcastedIndicesToOffset=!0;let d=`${c.name}broadcastedIndicesTo${a}Offset`;if(d in B)return`${d}(${b})`;let e=[];for(let a=k-1;a>=0;a--){let b=c.indicesGet("outputIndices",a+c.rank-k);e.push(`${A(u,a)} * (${b} % ${A(t,a)})`)}return B[d]=`fn ${d}(outputIndices: ${c.type.indices}) -> u32 {
             return ${e.length>0?e.join("+"):"0u"};
           }`,`${d}(${b})`},indices:z,indicesGet:A,indicesSet:(a,b,c)=>k<2?`${a}=${c};`:`${bp(a,b,k)}=${c};`,set:(...b)=>{if(b.length!==k+1)throw Error(`indices length must be ${k}`);let c=b[k];if("string"!=typeof c)throw Error("value must be string");let d=b.slice(0,k).map(q).join(",");return 0===k?C("0u",c):1===k?C(d[0],c):(r.set=!0,r.setByIndices=!0,r.indicesToOffset=!0,`set_${a}(${d}, ${c})`)},setByOffset:C,setByIndices:(b,c)=>k<2?C(b,c):(r.setByIndices=!0,r.indicesToOffset=!0,`set_${a}ByIndices(${b}, ${c});`),get:(...b)=>{if(b.length!==k)throw Error(`indices length must be ${k}`);let c=b.map(q).join(",");return 0===k?D("0u"):1===k?D(c[0]):(r.get=!0,r.getByIndices=!0,r.indicesToOffset=!0,`get_${a}(${c})`)},getByOffset:D,getByIndices:b=>k<2?D(b):(r.getByIndices=!0,r.indicesToOffset=!0,`get_${a}ByIndices(${b})`),usage:d,name:a,strides:u,shape:t,rank:k}},br=(a,b,c,d=1)=>bq(a,b,c,"input",d),bs=(a,b,c,d=1)=>bq(a,b,c,"output",d),bt=(a,b,c)=>bq(a,b,c,"atomicOutput",1),bu=(a,b,c,d=1)=>bq(a,b,c,"internal",d),bv=class{constructor(a,b){this.normalizedDispatchGroup=a,this.limits=b,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(a){return`if (global_idx >= ${"number"==typeof a?`${a}u`:a}) { return; }`}mainStart(a=bg){let b="number"==typeof a?a:a[0],c="number"==typeof a?1:a[1],d="number"==typeof a?1:a[2];if(b>this.limits.maxComputeWorkgroupSizeX||c>this.limits.maxComputeWorkgroupSizeY||d>this.limits.maxComputeWorkgroupSizeZ)throw Error(`workgroup size [${b}, ${c}, ${d}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(b*c*d>this.limits.maxComputeInvocationsPerWorkgroup)throw Error(`workgroup size [${b}, ${c}, ${d}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let e=1===this.normalizedDispatchGroup[1]&&1===this.normalizedDispatchGroup[2],f=e?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,g=e?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${b*c*d}u + local_idx;`;return`@compute @workgroup_size(${b}, ${c}, ${d})
  fn main(${f}) {
    ${g}
  `}appendVariableUniforms(a){0!==a.rank&&(a.shape.startsWith("uniforms.")&&this.uniforms.push({name:a.shape.replace("uniforms.",""),type:"u32",length:a.rank}),a.strides.startsWith("uniforms.")&&this.uniforms.push({name:a.strides.replace("uniforms.",""),type:"u32",length:a.rank}))}declareVariable(a,b){if("internal"===a.usage)throw Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(a),this.appendVariableUniforms(a);let c="input"===a.usage?"read":"read_write",d="atomicOutput"===a.usage?"atomic<i32>":a.type.storage;return`@group(0) @binding(${b}) var<storage, ${c}> ${a.name}: array<${d}>;`}declareVariables(...a){return a.map(a=>this.declareVariable(a,this.variableIndex++)).join(`
`)}registerInternalVariable(a){if("internal"!==a.usage)throw Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(a),this.appendVariableUniforms(a)}registerInternalVariables(...a){return a.forEach(a=>this.registerInternalVariable(a)),this}registerUniform(a,b,c=1){return this.uniforms.push({name:a,type:b,length:c}),this}registerUniforms(a){return this.uniforms=this.uniforms.concat(a),this}uniformDeclaration(){if(0===this.uniforms.length)return"";let a=[];for(let{name:b,type:c,length:d}of this.uniforms)if(d&&d>4)"f16"===c?a.push(`@align(16) ${b}:array<mat2x4<${c}>, ${Math.ceil(d/8)}>`):a.push(`${b}:array<vec4<${c}>, ${Math.ceil(d/4)}>`);else{let e=null==d||1===d?c:`vec${d}<${c}>`;a.push(`${b}:${e}`)}return`
      struct Uniforms { ${a.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(a=>a.impl()).join(`
`)+this.internalVariables.map(a=>a.impl()).join(`
`)}get variablesInfo(){if(0!==this.uniforms.length)return this.uniforms.map(a=>[[12,10,1,6][["u32","f16","f32","i32"].indexOf(a.type)],a.length??1])}},bw=(a,b)=>new bv(a,b)}),fs=O(()=>{fj(),fq(),fp(),fr(),bx=(a,b)=>0!==b.length?b:[...Array(a).keys()].reverse(),by=(a,b)=>{let c,d,e=a.dataType,f=a.dims.length,g=bx(f,b),h=(c=a.dims,d=g,bb.sortBasedOnPerm(c,bx(c.length,d))),i=a.dims,j=h;if(f<2||((a,b)=>{let c=0;for(let d=0;d<a.length;++d)if(1!==b[a[d]]){if(a[d]<c)return!1;c=a[d]}return!0})(g,a.dims))return{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let b=bb.size(h);return{outputs:[{dims:h,dataType:a.dataType}],dispatchGroup:{x:Math.ceil(b/64/4)},programUniforms:[{type:12,data:Math.ceil(b/4)}]}},getShaderSource:a=>{let b=br("input",e,i,4),c=bs("output",e,j,4);return`
  ${a.registerUniform("output_size","u32").declareVariables(b,c)}
  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`}};let{newShape:k,newPerm:l}=((a,b)=>{let c=[],d=[];for(let e=0;e<a.length;++e)1!==a[e]&&c.push(a[e]),1!==a[b[e]]&&d.push(b[e]);return{newShape:c,newPerm:d}})(a.dims,g),m=bb.areEqual(l,[2,3,1]),n=bb.areEqual(l,[3,1,2]);return 2===k.length||m||n?(j=[(i=m?[k[0],k[1]*k[2]]:n?[k[0]*k[1],k[2]]:k)[1],i[0]],{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let b=bb.size(h);return{outputs:[{dims:h,dataType:a.dataType}],dispatchGroup:{x:Math.ceil(j[1]/16),y:Math.ceil(j[0]/16)},programUniforms:[{type:12,data:b},...bk(i,j)]}},getShaderSource:a=>{let b=br("a",e,i.length),c=bs("output",e,j.length);return`
  ${a.registerUniform("output_size","u32").declareVariables(b,c)}
  var<workgroup> tile : array<array<${c.type.value}, 17>, 16>;
  ${a.mainStart([16,16,1])}
    let stride = (uniforms.output_shape[1] - 1) / 16 + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * 16u + local_id.x;
    let input_row = workgroup_id_x * 16u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${b.getByIndices(`${b.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * 16u + local_id.x;
    let output_row = workgroup_id_y * 16u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${c.setByIndices(`${c.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`}}):{name:"Transpose",shaderCache:{hint:`${b}`,inputDependencies:["rank"]},getRunData:()=>{let b=bb.size(h);return{outputs:[{dims:h,dataType:a.dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...bk(i,j)]}},getShaderSource:a=>{let b=br("a",e,i.length),c=bs("output",e,j.length);return`
  ${a.registerUniform("output_size","u32").declareVariables(b,c)}

  ${((a,b,c,d)=>{let e=`fn perm(i: ${d.type.indices}) -> ${c.type.indices} {
    var a: ${c.type.indices};`;for(let c=0;c<b;++c)e+=`a[${a[c]}]=i[${c}];`;return e+"return a;}"})(g,f,b,c)}

  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${c.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${c.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`}}},bz=(a,b)=>{((a,b)=>{if(!a||1!==a.length)throw Error("Transpose requires 1 input.");if(0!==b.length&&b.length!==a[0].dims.length)throw Error(`perm size ${b.length} does not match input rank ${a[0].dims.length}`)})(a.inputs,b.perm),a.compute(by(a.inputs[0],b.perm))},bA=a=>a8({perm:a.perm})}),ft=O(()=>{fj(),fq(),fr(),fu(),fs(),bB={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},bC={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},bD={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},bE={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},bF=(a,b,c,d)=>{var e,f,g,h,i,j,k;let l,m,n,o,p,q,r,s=1===a.inputs.length?c:bT(a.inputs,c),t=s.axes;0!==t.length||s.noopWithEmptyAxes||(t=a.inputs[0].dims.map((a,b)=>b));let u=bb.normalizeAxes(t,a.inputs[0].dims.length),v=u,w=a.inputs[0],x=((a,b)=>{let c=[];if(!((a,b)=>{for(let c=0;c<a.length;++c)if(a[a.length-c-1]!==b-1-c)return!1;return!0})(a,b)){for(let d=0;d<b;++d)-1===a.indexOf(d)&&c.push(d);a.forEach(a=>c.push(a))}return c})(v,a.inputs[0].dims.length);x.length>0&&(w=a.compute(by(a.inputs[0],x),{inputs:[0],outputs:[-1]})[0],v=((a,b)=>{let c=[];for(let d=b-a;d<b;++d)c.push(d);return c})(v.length,w.dims.length));let[y,z]=((a,b)=>{let c=[],d=a.length;for(let e=0;e<d;e++)-1===b.indexOf(e)&&c.push(a[e]);return[c,b.map(b=>a[b])]})(w.dims,v),A=y;s.keepDims&&(A=((a,b)=>{let c=a.length+b.length,d=[],e=0;for(let f=0;f<c;f++)-1===b.indexOf(f)?d.push(a[e++]):d.push(1);return d})(y,u)),a.compute((e=b,f=s.cacheKey,g=[w],h=d,i=a.inputs[0].dataType,j=A,k=z,l=g[0].dims,m=bb.size(j),n=bb.size(k),o=br("_A",g[0].dataType,l),p=bs("output",i,j),q=64,1===m&&(q=256),r=`
          var<workgroup> aBestValues : array<f32, ${q}>;
       `,{name:e,shaderCache:{hint:`${f};${q}`,inputDependencies:["type"]},getShaderSource:a=>`
        ${a.registerUniform("reduceSize","u32").declareVariables(o,p)}
        ${r}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${a.mainStart(q)}

          let outputIndex = global_idx / ${q};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${bD[h]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${q}) {
           let candidate = f32(${o.getByOffset("offset + k")});
           bestValue = ${bB[h]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${q}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${bC[h]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${p.setByOffset("outputIndex",`${"mean"===h?`${p.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${p.type.storage}(${bE[h]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:j,dataType:i}],dispatchGroup:{x:m},programUniforms:[{type:12,data:n}]})}),{inputs:[w]})},bG=(a,b)=>{bF(a,"ReduceMeanShared",b,"mean")},bH=(a,b)=>{bF(a,"ReduceL1Shared",b,"l1")},bI=(a,b)=>{bF(a,"ReduceL2Shared",b,"l2")},bJ=(a,b)=>{bF(a,"ReduceLogSumExpShared",b,"logSumExp")},bK=(a,b)=>{bF(a,"ReduceMaxShared",b,"max")},bL=(a,b)=>{bF(a,"ReduceMinShared",b,"min")},bM=(a,b)=>{bF(a,"ReduceProdShared",b,"prod")},bN=(a,b)=>{bF(a,"ReduceSumShared",b,"sum")},bO=(a,b)=>{bF(a,"ReduceSumSquareShared",b,"sumSquare")},bP=(a,b)=>{bF(a,"ReduceLogSumShared",b,"logSum")}}),fu=O(()=>{fj(),fq(),fp(),fr(),ft(),bQ=a=>{if(!a||0===a.length||a.length>2)throw Error("Reduce op requires 1 or 2 inputs.");if(2===a.length&&1!==a[1].dims.length)throw Error("Invalid axes input dims.")},bR=a=>["","",`var value = ${a.getByIndices("input_indices")};`,""],bS=(a,b,c,d,e,f,g=!1,h=!1)=>{let i=[],j=c[0].dims,k=j.length,l=bb.normalizeAxes(e,k),m=!h&&0===l.length;j.forEach((a,b)=>{m||l.indexOf(b)>=0?g&&i.push(1):i.push(a)});let n=i.length,o=bb.size(i);return{name:a,shaderCache:b,getShaderSource:a=>{let b=[],e=br("_A",c[0].dataType,k),h=bs("output",f,n),i=d(e,h,l),o=i[2];for(let a=0,c=0;a<k;a++)m||l.indexOf(a)>=0?(g&&c++,o=`for(var j${a}: u32 = 0; j${a} < ${j[a]}; j${a}++) {
                  ${i[2].includes("last_index")?`let last_index = j${a};`:""}
                  ${e.indicesSet("input_indices",a,`j${a}`)}
                  ${o}
                }`):(b.push(`${e.indicesSet("input_indices",a,h.indicesGet("output_indices",c))};`),c++);return`

        ${a.registerUniform("output_size","u32").declareVariables(e,h)}

        ${a.mainStart()}
          ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${e.type.indices};
          let output_indices = ${h.offsetToIndices("global_idx")};

          ${b.join(`
`)}
          ${i[0]}       // init ops for reduce max/min
          ${i[1]}
          ${o}
          ${i[3]}
          ${4===i.length?h.setByOffset("global_idx","value"):i.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:i,dataType:f}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},...bk(j,i)]})}},bT=(a,b)=>{let c=[];return a[1].dims[0]>0&&a[1].getBigInt64Array().forEach(a=>c.push(Number(a))),a8({axes:c,keepDims:b.keepDims,noopWithEmptyAxes:b.noopWithEmptyAxes})},bU=(a,b,c,d)=>{let e=a.inputs,f=1===e.length?c:bT(e,c);a.compute(bS(b,{hint:f.cacheKey,inputDependencies:["rank"]},[e[0]],f.noopWithEmptyAxes&&0===f.axes.length?bR:d,f.axes,e[0].dataType,f.keepDims,f.noopWithEmptyAxes),{inputs:[0]})},bV=(a,b,c)=>{if(0===b.length)return c;let d=1,e=1;for(let c=0;c<b.length;c++)-1===b.indexOf(c)?d*=a[c]:e*=a[c];return e<32&&d>1024},bW=(a,b)=>{var c,d;bV(a.inputs[0].dims,b.axes,b.noopWithEmptyAxes)?(c=a,d=b,bQ(c.inputs),bU(c,"ReduceMean",d,(a,b,d)=>{let e=1;for(let b=0;b<a.rank;b++)(d.indexOf(b)>=0||0===d.length)&&(e*=c.inputs[0].dims[b]);return["var sum = f32(0);","",`sum += f32(${a.getByIndices("input_indices")});`,`let value = ${b.type.value}(sum / ${e});`]})):bG(a,b)},bX=(a,b)=>{var c,d;bV(a.inputs[0].dims,b.axes,b.noopWithEmptyAxes)?(c=a,d=b,bQ(c.inputs),bU(c,"ReduceL1",d,(a,b)=>[`var value = ${b.type.storage}(0);`,"",`value += abs(${a.getByIndices("input_indices")});`,""])):bH(a,b)},bY=(a,b)=>{var c,d;bV(a.inputs[0].dims,b.axes,b.noopWithEmptyAxes)?(c=a,d=b,bQ(c.inputs),bU(c,"ReduceL2",d,(a,b)=>[`var t = ${b.type.value}(0); var value = ${b.type.value}(0);`,"",`t = ${a.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])):bI(a,b)},bZ=(a,b)=>{var c,d;bV(a.inputs[0].dims,b.axes,b.noopWithEmptyAxes)?(c=a,d=b,bQ(c.inputs),bU(c,"ReduceLogSumExp",d,(a,b)=>[`var value = ${b.type.storage}(0);`,"",`value += exp(${a.getByIndices("input_indices")});`,"value = log(value);"])):bJ(a,b)},b$=(a,b)=>{var c,d;bV(a.inputs[0].dims,b.axes,b.noopWithEmptyAxes)?(c=a,d=b,bQ(c.inputs),bU(c,"ReduceMax",d,(a,b,c)=>{let d=[];for(let b=0;b<a.rank;b++)(c.indexOf(b)>=0||0===c.length)&&d.push(a.indicesSet("input_indices",b,0));return[`${d.join(`
`)}`,`var value = ${a.getByIndices("input_indices")};`,`value = max(value, ${a.getByIndices("input_indices")});`,""]})):bK(a,b)},b_=(a,b)=>{var c,d;bV(a.inputs[0].dims,b.axes,b.noopWithEmptyAxes)?(c=a,d=b,bQ(c.inputs),bU(c,"ReduceMin",d,(a,b,c)=>{let d=[];for(let b=0;b<a.rank;b++)(c.indexOf(b)>=0||0===c.length)&&d.push(`input_indices[${b}] = 0;`);return[`${d.join(`
`)}`,`var value = ${a.getByIndices("input_indices")};`,`value = min(value, ${a.getByIndices("input_indices")});`,""]})):bL(a,b)},b0=(a,b)=>{var c,d;bV(a.inputs[0].dims,b.axes,b.noopWithEmptyAxes)?(c=a,d=b,bQ(c.inputs),bU(c,"ReduceProd",d,(a,b)=>[`var value = ${b.type.storage}(1);`,"",`value *= ${a.getByIndices("input_indices")};`,""])):bM(a,b)},b1=(a,b)=>{var c,d;bV(a.inputs[0].dims,b.axes,b.noopWithEmptyAxes)?(c=a,d=b,bQ(c.inputs),bU(c,"ReduceSum",d,(a,b)=>[`var value = ${b.type.storage}(0);`,"",`value += ${a.getByIndices("input_indices")};`,""])):bN(a,b)},b2=(a,b)=>{var c,d;bV(a.inputs[0].dims,b.axes,b.noopWithEmptyAxes)?(c=a,d=b,bQ(c.inputs),bU(c,"ReduceSumSquare",d,(a,b)=>[`var t = ${b.type.value}(0); var value = ${b.type.value}(0);`,"",`t = ${a.getByIndices("input_indices")}; value += t * t;`,""])):bO(a,b)},b3=(a,b)=>{var c,d;bV(a.inputs[0].dims,b.axes,b.noopWithEmptyAxes)?(c=a,d=b,bQ(c.inputs),bU(c,"ReduceLogSum",d,(a,b)=>[`var value = ${b.type.storage}(0);`,"",`value += ${a.getByIndices("input_indices")};`,"value = log(value);"])):bP(a,b)}}),fv=O(()=>{fj(),fp(),fu(),b4=a=>{if(!a||0===a.length||a.length>2)throw Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(1!==a[0].dataType)throw Error("Invalid input type.")},b5=(a,b)=>{b4(a.inputs),a.compute(bS("ArgMin",{hint:b.cacheKey,inputDependencies:["rank"]},[a.inputs[0]],(a,c,d)=>{let e=[];for(let b=0;b<a.rank;b++)(d.indexOf(b)>=0||0===d.length)&&e.push(`input_indices[${b}] = 0;`);return[`${e.join(`
`)}`,`var value = ${a.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${a.getByIndices("input_indices")} ${b.selectLastIndex>0?"<=":"<"} value) {
         value = ${a.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",c.setByOffset("global_idx","best_index")]},[b.axis],7,b.keepDims),{inputs:[0]})},b6=(a,b)=>{b4(a.inputs),a.compute(bS("argMax",{hint:b.cacheKey,inputDependencies:["rank"]},[a.inputs[0]],(a,c,d)=>{let e=[];for(let b=0;b<a.rank;b++)(d.indexOf(b)>=0||0===d.length)&&e.push(`input_indices[${b}] = 0;`);return[`${e.join(`
`)}`,`var value = ${a.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${a.getByIndices("input_indices")} ${b.selectLastIndex>0?">=":">"} value) {
         value = ${a.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",c.setByOffset("global_idx","best_index")]},[b.axis],7,b.keepDims),{inputs:[0]})},b7=a=>a8(a)}),fw=O(()=>{fj(),fq(),fn(),fr(),b8=(a,b,c)=>b&&a?`
      let total_sequence_length_input = u32(${b.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${a?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${c?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,b9=(a,b,c,d,e,f,g,h,i,j,k,l)=>{var m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K;let L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,aa,ab,ac,ad,ae,af,ag,ah,ai,aj,ak,al,am,an,ao,ap,aq=Math.min(a.outputCount,1+ +!!g+ +!!h),ar=aq>1?j.pastSequenceLength:0,as=ar+j.kvSequenceLength,at=i&&bb.size(i.dims)>0?i:void 0,au=[b,c];aq>1&&g&&bb.size(g.dims)>0&&au.push(g),at&&au.push(at),k&&au.push(k),l&&au.push(l);let av=a.compute((m=aq,n=b,o=c,p=g,q=at,r=j,s=ar,t=k,u=l,L=s+r.kvSequenceLength,M=[r.batchSize,r.numHeads,r.sequenceLength,L],N=m>1&&p,O=r.kvNumHeads?r.kvNumHeads:r.numHeads,P=N?[r.batchSize,O,L,r.headSize]:void 0,Q=r.nReps?r.nReps:1,R=0===r.scale?1/Math.sqrt(r.headSize):r.scale,S=bl(r.headSize),T=r.headSize/S,U={x:Math.ceil(L/12),y:Math.ceil(r.sequenceLength/12),z:r.batchSize*r.numHeads},V=[{type:12,data:r.sequenceLength},{type:12,data:T},{type:12,data:L},{type:12,data:r.numHeads},{type:12,data:r.headSize},{type:1,data:R},{type:12,data:s},{type:12,data:r.kvSequenceLength},{type:12,data:Q}],W=N&&p&&bb.size(p.dims)>0,X=["type","type"],W&&X.push("type"),q&&X.push("type"),t&&X.push("type"),u&&X.push("type"),Y=[{dims:M,dataType:n.dataType,gpuDataType:0}],N&&Y.push({dims:P,dataType:n.dataType,gpuDataType:0}),{name:"AttentionProbs",shaderCache:{hint:`${S};${void 0!==q};${void 0!==p};${m}`,inputDependencies:X},getRunData:()=>({outputs:Y,dispatchGroup:U,programUniforms:V}),getShaderSource:a=>{let b=br("q",n.dataType,n.dims,S),c=[b,br("key",o.dataType,o.dims,S)];if(W){let a=br("past_key",p.dataType,p.dims,S);c.push(a)}q&&c.push(br("attention_bias",q.dataType,q.dims));let d=t?br("seq_lens",t.dataType,t.dims):void 0;d&&c.push(d);let e=u?br("total_sequence_length_input",u.dataType,u.dims):void 0;e&&c.push(e);let f=bs("output",n.dataType,M),g=[f];N&&g.push(bs("present_key",n.dataType,P,S));let h=bj(1,S);return`
  const TILE_SIZE = 12u;

  var<workgroup> tileQ: array<${b.type.storage}, 144>;
  var<workgroup> tileK: array<${b.type.storage}, 144>;
  ${a.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}]).declareVariables(...c,...g)}
  ${a.mainStart([12,12,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${1===Q?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${1===Q?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${b8(d,e,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${W&&N?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${N?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${h}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${W&&N?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${N?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${h}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(S){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw Error(`Unsupported components: ${S}`)}})()};
        output[outputIdx] = ${f.type.value} (sum * uniforms.alpha) + ${q?"attention_bias[outputIdx]":"0.0"};
    }
  }`}}),{inputs:au,outputs:aq>1?[-1,1]:[-1]})[0];a.compute((v=av,w=j.batchSize,x=j.numHeads,y=ar,z=j.sequenceLength,A=as,B=k,C=l,Z=bl(B?1:A),$=64,(_=A/Z)<64&&($=32),aa=[{type:12,data:w},{type:12,data:x},{type:12,data:y},{type:12,data:z},{type:12,data:_},{type:12,data:Math.ceil(A/Z/$)}],ab=bi(v.dataType,Z),ac=bj(1,Z),ad=["type"],B&&ad.push("type"),C&&ad.push("type"),{name:"AttentionProbsSoftmax",shaderCache:{hint:`${$};${ab};${Z}`,inputDependencies:ad},getShaderSource:a=>{let b=bs("x",v.dataType,v.dims,Z),c=[b],d=B?br("seq_lens",B.dataType,B.dims):void 0;d&&c.push(d);let e=C?br("total_sequence_length_input",C.dataType,C.dims):void 0;e&&c.push(e);let f=bj(v.dataType);return`
  var<workgroup> thread_max: array<f32, ${$}>;
  var<workgroup> thread_sum: array<f32, ${$}>;
  ${a.registerUniforms([{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}]).declareVariables(...c)}
  ${a.mainStart([$,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${b8(d,e,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${$}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${B?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${ac}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${ac}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(Z){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw Error(`Unsupported components: ${Z}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${$}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${ac}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${ac}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(Z){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw Error(`Unsupported components: ${Z}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${$}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${b.type.value}(${f}(1.0) / ${f}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${ac}(x[offset + i]);
        x[offset + i] = ${b.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${B?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${b.type.value}(${f}(0));
        }`:""};
  }`},getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(A/$),y:z,z:w*x},programUniforms:aa})}),{inputs:k&&l?[av,k,l]:[av],outputs:[]});let aw=[av,d];aq>1&&h&&bb.size(h.dims)>0&&aw.push(h),k&&aw.push(k),l&&aw.push(l),a.compute((D=aq,E=av,F=d,G=h,H=j,I=ar,J=k,K=l,ae=I+H.kvSequenceLength,af=H.nReps?H.nReps:1,ag=H.vHiddenSize*af,ah=D>1&&G,ai=H.kvNumHeads?H.kvNumHeads:H.numHeads,aj=ah?[H.batchSize,ai,ae,H.headSize]:void 0,ak=[H.batchSize,H.sequenceLength,ag],al={x:Math.ceil(H.vHeadSize/12),y:Math.ceil(H.sequenceLength/12),z:H.batchSize*H.numHeads},am=[{type:12,data:H.sequenceLength},{type:12,data:ae},{type:12,data:H.vHeadSize},{type:12,data:H.numHeads},{type:12,data:H.headSize},{type:12,data:ag},{type:12,data:I},{type:12,data:H.kvSequenceLength},{type:12,data:af}],an=ah&&G&&bb.size(G.dims)>0,ao=["type","type"],an&&ao.push("type"),J&&ao.push("type"),K&&ao.push("type"),ap=[{dims:ak,dataType:E.dataType,gpuDataType:0}],ah&&ap.push({dims:aj,dataType:E.dataType,gpuDataType:0}),{name:"AttentionScore",shaderCache:{hint:`${void 0!==G};${D}`,inputDependencies:ao},getRunData:()=>({outputs:ap,dispatchGroup:al,programUniforms:am}),getShaderSource:a=>{let b=br("probs",E.dataType,E.dims),c=[b,br("v",F.dataType,F.dims)];an&&c.push(br("past_value",G.dataType,G.dims));let d=J?br("seq_lens",J.dataType,J.dims):void 0;J&&c.push(d);let e=K?br("total_sequence_length_input",K.dataType,K.dims):void 0;K&&c.push(e);let f=[bs("output",E.dataType,ak)];return ah&&f.push(bs("present_value",E.dataType,aj)),`
  const TILE_SIZE = 12u;
  var<workgroup> tileQ: array<${b.type.value}, 144>;
  var<workgroup> tileV: array<${b.type.value}, 144>;
  ${a.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}]).declareVariables(...c,...f)}
  ${a.mainStart([12,12,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${1===af?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${1===af?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${b8(d,e,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${an&&ah?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${ah?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${b.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${an&&ah?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${ah?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`}}),{inputs:aw,outputs:aq>1?[0,2]:[0]})},ca=(a,b)=>{var c,d;let e,f,g,h,i,j,k,l=((a,b)=>{let c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],h=a[5];if(g&&h)throw Error("Attention cannot have both past and attention_bias");if(3!==c.dims.length)throw Error('Input "input" must have 3 dimensions');let i=c.dims[0],j=c.dims[1],k=c.dims[2];if(1!==e.dims.length)throw Error('Input "bias" is expected to have 1 dimensions');if(2!==d.dims.length)throw Error('Input "weights" is expected to have 2 dimensions');if(d.dims[0]!==k)throw Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(e.dims[0]!==d.dims[1])throw Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let l=e.dims[0]/3,m=l,n=m;if(b.qkvHiddenSizes.length>0){if(3!==b.qkvHiddenSizes.length)throw Error("qkv_hidden_sizes attribute should have 3 elements");for(let a of b.qkvHiddenSizes)if(a%b.numHeads!=0)throw Error("qkv_hidden_sizes should be divisible by num_heads");l=b.qkvHiddenSizes[0],m=b.qkvHiddenSizes[1],n=b.qkvHiddenSizes[2]}if(l!==m)throw Error("qkv_hidden_sizes first element should be same as the second");if(e.dims[0]!==l+m+n)throw Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let o=0;if(g){if(m!==n)throw Error('Input "past" expect k_hidden_size == v_hidden_size');if(5!==g.dims.length)throw Error('Input "past" must have 5 dimensions');if(2!==g.dims[0])throw Error('Input "past" first dimension must be 2');if(g.dims[1]!==i)throw Error('Input "past" second dimension must be batch_size');if(g.dims[2]!==b.numHeads)throw Error('Input "past" third dimension must be num_heads');if(g.dims[4]!==m/b.numHeads)throw Error('Input "past" fifth dimension must be k_hidden_size / num_heads');b.pastPresentShareBuffer||(o=g.dims[3])}let p=j+o;if(f)throw Error("Mask not supported");if(g)throw Error("past is not supported");if(h){if(4!==h.dims.length)throw Error('Input "attention_bias" must have 4 dimensions');if(h.dims[0]!==i||h.dims[1]!==b.numHeads||h.dims[2]!==j||h.dims[3]!==p)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:i,sequenceLength:j,pastSequenceLength:o,kvSequenceLength:j,totalSequenceLength:p,maxSequenceLength:-1,inputHiddenSize:k,hiddenSize:l,vHiddenSize:n,headSize:Math.floor(l/b.numHeads),vHeadSize:Math.floor(n/b.numHeads),numHeads:b.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:b.maskFilterValue,maskType:0,scale:b.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}})(a.inputs,b),[m,n,o]=(c=a,e=[(d=l).batchSize,d.numHeads,d.sequenceLength,d.headSize],f=d.sequenceLength,g=d.inputHiddenSize,h=d.headSize,i={x:Math.ceil(d.headSize/12),y:Math.ceil(d.sequenceLength/12),z:d.batchSize*d.numHeads},j=[c.inputs[0],c.inputs[1],c.inputs[2]],k=[{type:12,data:f},{type:12,data:g},{type:12,data:h},{type:12,data:d.numHeads},{type:12,data:d.headSize},{type:12,data:d.hiddenSize},{type:12,data:d.hiddenSize+d.hiddenSize+d.vHiddenSize}],c.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:e,dataType:c.inputs[0].dataType,gpuDataType:0},{dims:e,dataType:c.inputs[0].dataType,gpuDataType:0},{dims:e,dataType:c.inputs[0].dataType,gpuDataType:0}],dispatchGroup:i,programUniforms:k}),getShaderSource:a=>{let b=bs("output_q",j[0].dataType,e),c=bs("output_k",j[0].dataType,e),d=bs("output_v",j[0].dataType,e),f=br("input",j[0].dataType,j[0].dims),g=br("weight",j[1].dataType,j[1].dims),h=br("bias",j[2].dataType,j[2].dims),i=f.type.storage;return`
  const TILE_SIZE = 12u;
  var<workgroup> tileInput: array<${i}, 144>;
  var<workgroup> tileWeightQ: array<${i}, 144>;
  var<workgroup> tileWeightK: array<${i}, 144>;
  var<workgroup> tileWeightV: array<${i}, 144>;
  ${a.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}]).declareVariables(f,g,h,b,c,d)}
  ${a.mainStart([12,12,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${i}(0);
    var valueK = ${i}(0);
    var valueV = ${i}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`}},{inputs:j,outputs:[-1,-1,-1]}));return b9(a,m,n,o,a.inputs[4],void 0,void 0,void 0,a.inputs[5],l)}}),fx=O(()=>{ai(),fj(),fq(),fp(),fr(),cb=(a,b)=>{let c,{inputs:d,outputCount:e}=a,f=(c={...b,outputCount:e},a8(c));if(m.webgpu.validateInputContent&&((a,b)=>{if(!a||5!==a.length)throw Error("BatchNormalization requires 5 inputs");let c=(a,b,c)=>{let d=b.length;if(d!==a.length)throw Error(`${c}: num dimensions != ${d}`);b.forEach((b,d)=>{if(b!==a[d])throw Error(`${c}: dim[${d}] do not match`)})};if(a[0].dims.length>1){let d="NHWC"===b.format?b.spatial?a[0].dims.slice(-1):a[0].dims.slice(-1).concat(a[0].dims.slice(1,a[0].dims.length-1)):a[0].dims.slice(1,b.spatial?2:void 0);c(a[1].dims,d,"Invalid input scale"),c(a[2].dims,d,"Invalid input B"),c(a[3].dims,d,"Invalid input mean"),c(a[4].dims,d,"Invalid input var")}else c(a[1].dims,[1],"Invalid input scale"),c(a[2].dims,[1],"Invalid input B"),c(a[3].dims,[1],"Invalid input mean"),c(a[4].dims,[1],"Invalid input var")})(d,f),b.trainingMode)throw Error("BatchNormalization trainingMode is not supported yet.");a.compute(((a,b)=>{let{epsilon:c,spatial:d,format:e}=b,f=a[0].dims,g=d?bl(f[f.length-1]):1,h="NHWC"===e&&f.length>1?g:1,i=bb.size(f)/g,j=d?f.length:f,k=br("x",a[0].dataType,a[0].dims,g),l=br("scale",a[1].dataType,a[1].dims,h),m=br("bias",a[2].dataType,a[2].dims,h),n=br("inputMean",a[3].dataType,a[3].dims,h),o=br("inputVar",a[4].dataType,a[4].dims,h),p=bs("y",a[0].dataType,j,g);return{name:"BatchNormalization",shaderCache:{hint:`${b.epsilon}_${b.format}_${d}_${g}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:a=>`
  const epsilon = ${c};
  ${a.registerUniform("outputSize","u32").declareVariables(k,l,m,n,o,p)}
  ${a.mainStart()}
  ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${p.offsetToIndices(`global_idx * ${g}`)};
    ${(()=>{let a="";if(d)a=`let cOffset = ${1===f.length?"0u":"NHWC"===e?`outputIndices[${f.length-1}] / ${g}`:"outputIndices[1]"};`;else if("NCHW"===e)a=`
            ${p.indicesSet("outputIndices","0","0")}
            let cOffset = ${p.indicesToOffset("outputIndices")};`;else{a=`var cIndices = ${l.type.indices}(0);
                       cIndices[0] = outputIndices[${f.length-1}];`;for(let b=1;b<l.rank;b++)a+=`cIndices[${b}] = outputIndices[${b}];`;a+=`let cOffset = ${l.indicesToOffset("cIndices")};`}return a})()}
    let scale = ${l.getByOffset("cOffset")};
    let bias = ${m.getByOffset("cOffset")};
    let inputMean = ${n.getByOffset("cOffset")};
    let inputVar = ${o.getByOffset("cOffset")};
    let x = ${k.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${p.setByOffset("global_idx","value")}
  }`,getRunData:()=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:d?[{type:12,data:i},...bk(f)]:[{type:12,data:i}]})}})(d,f))}}),fy=O(()=>{fq(),fr(),cc=a=>{var b;let c,d,e,f,g,h,i,j;(a=>{if(3!==a[0].dims.length)throw Error("input should have 3 dimensions");if(![320,640,1280].includes(a[0].dims[2]))throw Error("number of channels should be 320, 640 or 1280");if(1!==a[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(a[0].dims[2]!==a[1].dims[0])throw Error("last dimension of input and bias are not the same")})(a.inputs),a.compute((c=(b=a.inputs)[0].dims,d=b[0].dims[2],e=bb.size(c)/4,f=b[0].dataType,g=br("input",f,c,4),h=br("bias",f,[d],4),i=br("residual",f,c,4),j=bs("output",f,c,4),{name:"BiasAdd",getRunData:()=>({outputs:[{dims:c,dataType:b[0].dataType}],dispatchGroup:{x:Math.ceil(e/64)}}),getShaderSource:a=>`
  const channels = ${d}u / 4;
  ${a.declareVariables(g,h,i,j)}

  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes(e)}
    let value = ${g.getByOffset("global_idx")}
      + ${h.getByOffset("global_idx % channels")} + ${i.getByOffset("global_idx")};
    ${j.setByOffset("global_idx","value")}
  }`}))}}),fz=O(()=>{fj(),fq(),fp(),fr(),cd=(a,b,c,d,e,f=a.dataType,g,h)=>{let i=[{type:12,data:Math.ceil(bb.size(a.dims)/4)}];return g&&i.push(...g),{name:b,shaderCache:{hint:e,inputDependencies:["type"]},getShaderSource:b=>{var e,g,i,j,k,l,m;let n,o,p,q,r;return e=b,g=bb.size(a.dims),i=a.dataType,j=f,k=c,l=d,m=h,n=Math.ceil(g/4),o="",o="string"==typeof k?`${k}(a)`:k("a"),p=br("inputData",i,[n],4),q=bs("outputData",j,[n],4),r=[{name:"vec_size",type:"u32"}],m&&r.push(...m),`
      ${e.registerUniforms(r).declareVariables(p,q)}

  ${l??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${q.setByOffset("global_idx",o)}
  }`},getRunData:b=>({outputs:[{dims:a.dims,dataType:f}],dispatchGroup:{x:Math.ceil(bb.size(b[0].dims)/64/4)},programUniforms:i})}},ce=a=>{a.compute(cd(a.inputs[0],"Abs","abs"))},cf=a=>{a.compute(cd(a.inputs[0],"Acos","acos"))},cg=a=>{a.compute(cd(a.inputs[0],"Acosh","acosh"))},ch=a=>{a.compute(cd(a.inputs[0],"Asin","asin"))},ci=a=>{a.compute(cd(a.inputs[0],"Asinh","asinh"))},cj=a=>{a.compute(cd(a.inputs[0],"Atan","atan"))},ck=a=>{a.compute(cd(a.inputs[0],"Atanh","atanh"))},cl=a=>a8(a),cm=(a,b)=>{let c;switch(b.to){case 10:c="vec4<f16>";break;case 1:c="vec4<f32>";break;case 12:c="vec4<u32>";break;case 6:c="vec4<i32>";break;case 9:c="vec4<bool>";break;default:throw RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${b.to}`)}a.compute(cd(a.inputs[0],"Cast",c,void 0,b.cacheKey,b.to))},cn=(a,b)=>{let c=b||(a=>{let b,c,d=a.length>=2&&0!==a[1].data,e=a.length>=3&&0!==a[2].data;switch(a[0].dataType){case 1:b=d?a[1].getFloat32Array()[0]:-34028234663852886e22,c=e?a[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:b=d?a[1].getUint16Array()[0]:64511,c=e?a[2].getUint16Array()[0]:31743;break;default:throw Error("Unsupport data type")}return a8({min:b,max:c})})(a.inputs),d=bj(a.inputs[0].dataType);a.compute(cd(a.inputs[0],"Clip",a=>`clamp(${a}, vec4<${d}>(uniforms.min), vec4<${d}>(uniforms.max))`,void 0,c.cacheKey,void 0,[{type:a.inputs[0].dataType,data:c.min},{type:a.inputs[0].dataType,data:c.max}],[{name:"min",type:d},{name:"max",type:d}]),{inputs:[0]})},co=a=>{a.compute(cd(a.inputs[0],"Ceil","ceil"))},cp=a=>{a.compute(cd(a.inputs[0],"Cos","cos"))},cq=a=>{a.compute(cd(a.inputs[0],"Cosh","cosh"))},cr=a=>a8(a),cs=(a,b)=>{let c=bj(a.inputs[0].dataType);a.compute(cd(a.inputs[0],"Elu",a=>`elu_vf32(${a})`,`
  const elu_alpha_ = ${c}(${b.alpha});

  fn elu_f32(a: ${c}) -> ${c} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${c}>) -> vec4<${c}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,b.cacheKey))},ct=(a="f32")=>`
const r0: ${a} = 0.3275911;
const r1: ${a} = 0.254829592;
const r2: ${a} = -0.284496736;
const r3: ${a} = 1.421413741;
const r4: ${a} = -1.453152027;
const r5: ${a} = 1.061405429;

fn erf_vf32(v: vec4<${a}>) -> vec4<${a}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,cu=a=>{let b=bj(a.inputs[0].dataType);a.compute(cd(a.inputs[0],"Erf",a=>`erf_vf32(${a})`,ct(b)))},cv=a=>{a.compute(cd(a.inputs[0],"Exp","exp"))},cw=a=>{a.compute(cd(a.inputs[0],"Floor","floor"))},cx=a=>{let b=bj(a.inputs[0].dataType);a.compute(cd(a.inputs[0],"Gelu",a=>`0.5 * ${a} * (1.0 + erf_vf32(${a} * 0.7071067811865475))`,ct(b)))},cy=(a,b)=>{let c=bj(a.inputs[0].dataType);a.compute(cd(a.inputs[0],"LeakyRelu",a=>`select(leaky_relu_alpha_ * ${a}, ${a}, ${a} >= vec4<${c}>(0.0))`,`const leaky_relu_alpha_ = ${c}(${b.alpha});`,b.cacheKey))},cz=a=>{a.compute(cd(a.inputs[0],"Not",a=>`!${a}`))},cA=a=>{a.compute(cd(a.inputs[0],"Neg",a=>`-${a}`))},cB=a=>{a.compute(cd(a.inputs[0],"Reciprocal",a=>`1.0/${a}`))},cC=a=>{let b=bj(a.inputs[0].dataType);a.compute(cd(a.inputs[0],"Relu",a=>`select(vec4<${b}>(0.0), ${a}, ${a} > vec4<${b}>(0.0))`))},cD=a=>{a.compute(cd(a.inputs[0],"Sigmoid",a=>`(1.0 / (1.0 + exp(-${a})))`))},cE=a=>a8(a),cF=(a,b)=>{let c=bj(a.inputs[0].dataType);a.compute(cd(a.inputs[0],"HardSigmoid",a=>`max(vec4<${c}>(0.0), min(vec4<${c}>(1.0), ${b.alpha} * ${a} + vec4<${c}>(${b.beta})))`,void 0,b.cacheKey))},cG=a=>{a.compute(cd(a.inputs[0],"Sin","sin"))},cH=a=>{a.compute(cd(a.inputs[0],"Sinh","sinh"))},cI=a=>{a.compute(cd(a.inputs[0],"Sqrt","sqrt"))},cJ=a=>{a.compute(cd(a.inputs[0],"Tan","tan"))},cK=a=>`sign(${a}) * (1 - exp(-2 * abs(${a}))) / (1 + exp(-2 * abs(${a})))`,cL=a=>{a.compute(cd(a.inputs[0],"Tanh",cK))},cM=(a="f32")=>`
const fast_gelu_a: ${a} = 0.5;
const fast_gelu_b: ${a} = 0.7978845608028654;
const fast_gelu_c: ${a} = 0.035677408136300125;

fn tanh_v(v: vec4<${a}>) -> vec4<${a}> {
  return ${cK("v")};
}
`,cN=a=>`(fast_gelu_a + fast_gelu_a * tanh_v(${a} * (fast_gelu_c * ${a} * ${a} + fast_gelu_b))) * ${a}`,cO=a=>{let b=bj(a.inputs[0].dataType);a.compute(cd(a.inputs[0],"FastGelu",cN,cM(b),void 0,a.inputs[0].dataType))},cP=(a,b)=>{let c=bj(a.inputs[0].dataType);return a.compute(cd(a.inputs[0],"ThresholdedRelu",a=>`select(vec4<${c}>(0.0), ${a}, ${a} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${c}>(${b.alpha});`,b.cacheKey)),0},cQ=a=>{a.compute(cd(a.inputs[0],"Log","log"))},cR=a=>`quick_gelu_impl(${a})`,cS=(a,b)=>{let c,d,e=bj(a.inputs[0].dataType);a.compute(cd(a.inputs[0],"QuickGelu",cR,(c=e,d=b.alpha,`
const alpha = vec4<${c}>(${d});
const one = ${c}(1.0);
const zero = ${c}(0.0);

fn quick_gelu_impl(x: vec4<${c}>) -> vec4<${c}> {
  let v = x *alpha;
  var x1 : vec4<${c}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`),b.cacheKey,a.inputs[0].dataType))}}),fA=O(()=>{fq(),fr(),fz(),cT=a=>{var b;let c,d,e,f,g,h;(a=>{if(3!==a[0].dims.length)throw Error("input should have 3 dimensions");if(![2560,5120,10240].includes(a[0].dims[2]))throw Error("hidden state should be 2560, 5120 or 10240");if(1!==a[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(a[0].dims[2]!==a[1].dims[0])throw Error("last dimension of input and bias are not the same")})(a.inputs),a.compute(((c=(b=a.inputs)[0].dims.slice())[2]=c[2]/2,d=br("input",b[0].dataType,b[0].dims,4),e=br("bias",b[0].dataType,[b[0].dims[2]],4),f=bs("output",b[0].dataType,c,4),g=bb.size(c)/4,h=bi(b[0].dataType),{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:c,dataType:b[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)}}),getShaderSource:a=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${b[0].dims[2]/4/2}u;

  ${a.declareVariables(d,e,f)}

  ${ct(h)}

  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes(g)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${f.setByOffset("global_idx","valueLeft * geluRight")}
  }`}))}}),fB=O(()=>{fj(),fq(),fr(),cU=(a,b,c,d,e,f)=>{a.compute(((a,b,c,d,e,f,g=c.dataType)=>{let h=c.dims.map(a=>Number(a)??1),i=d.dims.map(a=>Number(a)??1),j=!bb.areEqual(h,i),k=h,l=bb.size(h),m=!1,n=!1,o=[j];if(j){let a=ba.calcShape(h,i,!1);if(!a)throw Error("Can't perform binary op on the given tensors");k=a.slice(),l=bb.size(k);let b=1===bb.size(h),c=1===bb.size(i),d=h.length>0&&h[h.length-1]%4==0,e=i.length>0&&i[i.length-1]%4==0;o.push(b),o.push(c),o.push(d),o.push(e);let f=1;for(let a=1;a<k.length;a++){let b=h[h.length-a];if(b===i[i.length-a])f*=b;else break}f%4==0?(n=!0,m=!0):(b||c||d||e)&&(m=!0)}else m=!0;return o.push(m),{name:a,shaderCache:{hint:b+o.map(a=>a.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:a=>((a,b,c,d,e,f,g,h,i,j,k,l)=>{let m,n;"string"==typeof h?m=n=(a,b)=>`${h}((${a}),(${b}))`:"function"==typeof h?m=n=h:(m=h.scalar,n=h.vector);let o=bs("outputData",k,d.length,4),p=br("aData",i,b.length,4),q=br("bData",j,c.length,4),r;if(e)if(f){let a=1===bb.size(b),d=1===bb.size(c),e=b.length>0&&b[b.length-1]%4==0,f=c.length>0&&c[c.length-1]%4==0;r=a||d?o.setByOffset("global_idx",n(a?`${p.type.value}(${p.getByOffset("0")}.x)`:p.getByOffset("global_idx"),d?`${q.type.value}(${q.getByOffset("0")}.x)`:q.getByOffset("global_idx"))):`
            let outputIndices = ${o.offsetToIndices("global_idx * 4u")};
            let offsetA = ${p.broadcastedIndicesToOffset("outputIndices",o)};
            let offsetB = ${q.broadcastedIndicesToOffset("outputIndices",o)};
            ${o.setByOffset("global_idx",n(g||e?p.getByOffset("offsetA / 4u"):`${p.type.value}(${p.getByOffset("offsetA / 4u")}[offsetA % 4u])`,g||f?q.getByOffset("offsetB / 4u"):`${q.type.value}(${q.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else r=o.setByOffset("global_idx",n(p.getByOffset("global_idx"),q.getByOffset("global_idx")));else{if(!f)throw Error("no necessary to use scalar implementation for element-wise binary op implementation.");let a=(a,b,c="")=>{let d=`aData[indexA${b}][componentA${b}]`,e=`bData[indexB${b}][componentB${b}]`;return`
            let outputIndices${b} = ${o.offsetToIndices(`global_idx * 4u + ${b}u`)};
            let offsetA${b} = ${p.broadcastedIndicesToOffset(`outputIndices${b}`,o)};
            let offsetB${b} = ${q.broadcastedIndicesToOffset(`outputIndices${b}`,o)};
            let indexA${b} = offsetA${b} / 4u;
            let indexB${b} = offsetB${b} / 4u;
            let componentA${b} = offsetA${b} % 4u;
            let componentB${b} = offsetB${b} % 4u;
            ${a}[${b}] = ${c}(${m(d,e)});
          `};r=9===k?`
            var data = vec4<u32>(0);
            ${a("data",0,"u32")}
            ${a("data",1,"u32")}
            ${a("data",2,"u32")}
            ${a("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:`
            ${a("outputData[global_idx]",0)}
            ${a("outputData[global_idx]",1)}
            ${a("outputData[global_idx]",2)}
            ${a("outputData[global_idx]",3)}
          `}return`
        ${a.registerUniform("vec_size","u32").declareVariables(p,q,o)}

        ${l??""}

        ${a.mainStart()}
        ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${r}
      }`})(a,h,i,k,m,j,n,e,c.dataType,d.dataType,g,f),getRunData:()=>({outputs:[{dims:k,dataType:g}],dispatchGroup:{x:Math.ceil(l/64/4)},programUniforms:[{type:12,data:Math.ceil(bb.size(k)/4)},...bk(h,i,k)]})}})(b,e??"",a.inputs[0],a.inputs[1],c,d,f))},cV=a=>{cU(a,"Add",(a,b)=>`${a}+${b}`)},cW=a=>{cU(a,"Div",(a,b)=>`${a}/${b}`)},cX=a=>{cU(a,"Equal",{scalar:(a,b)=>`u32(${a}==${b})`,vector:(a,b)=>`vec4<u32>(${a}==${b})`},void 0,void 0,9)},cY=a=>{cU(a,"Mul",(a,b)=>`${a}*${b}`)},cZ=a=>{let b=br("input",a.inputs[0].dataType,a.inputs[0].dims).type.value;cU(a,"Pow",{scalar:(a,b)=>`pow_custom(${a},${b})`,vector:(a,b)=>`pow_vector_custom(${a},${b})`},`
    fn pow_custom(a : ${b}, b : ${b}) -> ${b} {
      if (b == ${b}(0.0)) {
        return ${b}(1.0);
      } else if (a < ${b}(0.0) && f32(b) != floor(f32(b))) {
        return ${b}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${b}(1.0), round(f32(abs(b) % ${b}(2.0))) != 1.0) * ${b}(${"i32"===b?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${b}>, b : vec4<${b}>) -> vec4<${b}> {
      // TODO: implement vectorized pow
      return vec4<${b}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},c$=a=>{cU(a,"Sub",(a,b)=>`${a}-${b}`)},c_=a=>{cU(a,"Greater",{scalar:(a,b)=>`u32(${a}>${b})`,vector:(a,b)=>`vec4<u32>(${a}>${b})`},void 0,void 0,9)},c0=a=>{cU(a,"Less",{scalar:(a,b)=>`u32(${a}<${b})`,vector:(a,b)=>`vec4<u32>(${a}<${b})`},void 0,void 0,9)},c1=a=>{cU(a,"GreaterOrEqual",{scalar:(a,b)=>`u32(${a}>=${b})`,vector:(a,b)=>`vec4<u32>(${a}>=${b})`},void 0,void 0,9)},c2=a=>{cU(a,"LessOrEqual",{scalar:(a,b)=>`u32(${a}<=${b})`,vector:(a,b)=>`vec4<u32>(${a}<=${b})`},void 0,void 0,9)}}),fC=O(()=>{fj(),fq(),fp(),fr(),c3=(a,b)=>{let c=a.inputs,d=c[0].dims,e=bb.normalizeAxis(b.axis,d.length);var f=c,g=e;if(!f||f.length<1)throw Error("too few inputs");let h=f[0],i=h.dataType,j=h.dims.length;f.forEach((a,b)=>{if(0!==b){if(a.dataType!==i)throw Error("input tensors should be one type");if(a.dims.length!==j)throw Error("input tensors should have the same shape");a.dims.forEach((a,b)=>{if(b!==g&&a!==h.dims[b])throw Error("non concat dimensions must match")})}});let k=d.slice();k[e]=c.reduce((a,b)=>a+(b.dims.length>e?b.dims[e]:0),0);let l=c.filter(a=>bb.size(a.dims)>0);a.compute(((a,b,c,d)=>{let e=bb.size(c),f=Array(a.length),g=Array(a.length),h=0,i=[],j=[],k=[{type:12,data:e}];for(let c=0;c<a.length;++c)h+=a[c].dims[b],f[c]=h,j.push(a[c].dims.length),g[c]=br(`input${c}`,d,j[c]),i.push("rank"),k.push({type:12,data:f[c]});for(let b=0;b<a.length;++b)k.push(...bk(a[b].dims));k.push(...bk(c));let l=bs("output",d,c.length),m=l.indicesGet("indices",b),n=Array.from(Array(f.length).keys()).map(a=>`uniforms.sizeInConcatAxis${a}`).join(",");return{name:"Concat",shaderCache:{hint:`${b}`,inputDependencies:i},getRunData:()=>({outputs:[{dims:c,dataType:d}],dispatchGroup:{x:Math.ceil(e/64)},programUniforms:k}),getShaderSource:b=>{let c,d;return`

  ${(()=>{b.registerUniform("outputSize","u32");for(let c=0;c<a.length;c++)b.registerUniform(`sizeInConcatAxis${c}`,"u32");return b.declareVariables(...g,l)})()}

  ${c=f.length,d=n,`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${c}u>(${d});
    for (var i: u32 = 0u; i < ${c}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${c}u;
  }`}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${l.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${m});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${f.length}u>(${n});
      ${m} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${((a,b)=>{let c=a.length,d=[];for(let e=0;e<c;++e){let f=b.setByOffset("global_idx",a[e].getByIndices("indices"));1===c?d.push(f):0===e?d.push(`if (inputIndex == ${e}u) { ${f} }`):e===c-1?d.push(`else { ${f} }`):d.push(`else if (inputIndex == ${e}) { ${f} }`)}return d.join(`
`)})(g,l)}
  }`}}})(l,e,k,c[0].dataType),{inputs:l})},c4=a=>a8({axis:a.axis})}),fD=O(()=>{fj(),fq(),c5=(a,b,c="f32")=>{switch(a.activation){case"Relu":return`value = max(value, ${b}(0.0));`;case"Sigmoid":return`value = (${b}(1.0) / (${b}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${b}(${c}(uniforms.clip_min)), ${b}(${c}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${b}(0.0), min(${b}(1.0), ${c}(uniforms.alpha) * value + ${c}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${c}(uniforms.alpha) * value, value, value >= ${b}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw Error(`Unsupported activation ${a.activation}`)}},c6=(a,b)=>{"Clip"===a.activation?b.push({type:1,data:a.clipMax},{type:1,data:a.clipMin}):"HardSigmoid"===a.activation?b.push({type:1,data:a.alpha},{type:1,data:a.beta}):"LeakyRelu"===a.activation&&b.push({type:1,data:a.alpha})},c7=(a,b)=>{"Clip"===a.activation?b.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):"HardSigmoid"===a.activation?b.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):"LeakyRelu"===a.activation&&b.push({name:"alpha",type:"f32"})},c8=a=>{let b=a?.activation||"";if("HardSigmoid"===b){let[c,d]=a?.activation_params||[.2,.5];return{activation:b,alpha:c,beta:d}}if("Clip"===b){let[c,d]=a?.activation_params||[be,bf];return{activation:b,clipMax:d,clipMin:c}}if("LeakyRelu"===b){let[c]=a?.activation_params||[.01];return{activation:b,alpha:c}}return{activation:b}}}),fE=O(()=>{c9=(a,b)=>{switch(a){case 1:return b;case 2:return`vec2<${b}>`;case 3:return`vec3<${b}>`;case 4:return`vec4<${b}>`;default:throw Error(`${a}-component is not supported.`)}},da=a=>`
      ${a?"value = value + getBiasByOutputCoords(coords);":""}
      `}),fF=O(()=>{db=a=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${a}.x), i32(${a}.y), i32(${a}.z), 1));
}
`}),fG=O(()=>{fj(),fq(),fr(),fD(),dc=(a,b,c,d,e)=>{let f=d-c;return`
      ${Array.from({length:c}).map((c,g)=>`
      if (${bp(b.shape,g,b.rank)} != 1) {
        ${b.indicesSet(a,g,bp(e,g+f,d))}
      } else {
        ${b.indicesSet(a,g,0)}
      }`).join("")}
`},dd=(a,b,c,d,e=!1,f)=>{let g=a[0].dims,h=a[1].dims,i=g[g.length-2],j=h[h.length-1],k=g[g.length-1],l=bl(j),m=bl(k),n=bl(i),o=bb.size(c)/l/n,p=a.length>2,q=d?d.slice(0,-2):c.slice(0,-2),r=[bb.size(q),i,j],s=[{type:12,data:o},{type:12,data:i},{type:12,data:j},{type:12,data:k}];return c6(b,s),s.push(...bk(q,g,h)),p&&s.push(...bk(a[2].dims)),s.push(...bk(r)),{name:"MatMulNaive",shaderCache:{hint:`${b.activation};${l};${m};${n};${e}`,inputDependencies:p?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:f?f(c):c,dataType:a[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:s}),getShaderSource:d=>{let f=bu("batch_dims",a[0].dataType,q.length),i=br("a",a[0].dataType,g.length,m),j=br("b",a[1].dataType,h.length,l),k=bs("output",a[0].dataType,r.length,l),o=bi(k.type.tensor),s=c5(b,k.type.value,o),t=[i,j],u="";if(p){let b=e?l:1;t.push(br("bias",a[2].dataType,a[2].dims.length,b)),u=`${e?`value += bias[col / ${b}];`:`value += ${k.type.value}(bias[row + i]);`}`}let v=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];return c7(b,v),`
  ${d.registerUniforms(v).registerInternalVariables(f).declareVariables(...t,k)}
  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${l})) * ${l};
    var index1 = global_idx / (uniforms.N / ${l});
    let stride1 = uniforms.M / ${n};
    let row = (index1 % stride1) * ${n};
    let batch = index1 / stride1;

    ${2===c.length?"":`let batch_indices = ${f.offsetToIndices("batch")};`}

    var a_indices: ${i.type.indices};
    ${dc("a_indices",i,i.rank-2,f.rank,"batch_indices")}
    ${i.indicesSet("a_indices",i.rank-2,0)}
    ${i.indicesSet("a_indices",i.rank-1,0)}
    let a_offset = ${i.indicesToOffset("a_indices")};

    var b_indices: ${j.type.indices};
    ${dc("b_indices",j,j.rank-2,f.rank,"batch_indices")}
    ${j.indicesSet("b_indices",j.rank-2,0)}
    ${j.indicesSet("b_indices",j.rank-1,0)}
    let b_offset = ${j.indicesToOffset("b_indices")};
    var values: array<${k.type.value}, ${n}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${m}) {
      ${(()=>{let a=`var a_data: ${i.type.value};`;for(let b=0;b<m;b++)a+=`
              let b_data${b} = b[(b_offset + (k + ${b}) * uniforms.N + col) / ${l}];`;for(let b=0;b<n;b++){a+=`a_data = a[(a_offset + (row + ${b}) * uniforms.K + k) / ${m}];`;for(let c=0;c<m;c++)a+=`
            values[${b}] = fma(${j.type.value}(a_data${1===m?"":`[${c}]`}), b_data${c}, values[${b}]);
`}return a})()}
    }
    for (var i = 0u; i < ${n}u; i++) {
      var value = values[i];
      ${u}
      ${s}
      let cur_indices = ${k.type.indices}(batch, row + i, col);
      let offset = ${k.indicesToOffset("cur_indices")};
      ${k.setByOffset(`offset / ${l}`,"value")};
    }
  }
  `}}}}),fH=O(()=>{fj(),fq(),fr(),fD(),fG(),fE(),de=(a,b,c="f32",d,e=!1,f=32,g=!1,h=32)=>{let i,j,k,l,m=b[1]*a[1],n=b[0]*a[0],o=e?m:f,p=e?f:m,q=o/b[0],r=f/b[1];if(!((e&&4===q&&4===a[1]||!e&&(3===q||4===q))&&o%b[0]==0&&f%b[1]==0&&4===a[0]))throw Error(`If transposeA ${e} is true, innerElementSize ${q} and workPerThread[1] ${a[1]} must be 4.
      Otherwise, innerElementSize ${q} must be 3 or 4.
  tileAWidth ${o} must be divisible by workgroupSize[0]${b[0]}. tileInner ${f} must be divisible by workgroupSize[1] ${b[1]}. colPerThread ${a[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${q}<${c}>, ${o/q}>, ${p}>;
var<workgroup> mm_Bsub: array<array<vec4<${c}>, ${n/a[0]}>, ${f}>;

const rowPerThread = ${a[1]};
const colPerThread = ${a[0]};
const innerElementSize = ${q};
const tileInner = ${f};

@compute @workgroup_size(${b[0]}, ${b[1]}, ${b[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${g?"0":"i32(globalId.z)"};
  ${d?`let batchIndices = ${d.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${m};

  let num_tiles = ${g?`${Math.ceil(h/f)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${g?`i32(globalId.z) * ${h}`:"0"};

  var acc: array<vec4<${c}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${r};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${i=e,j=d,i?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${j?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${j?", batchIndices":""});
        `}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${r}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${d?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${3===q?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${k=e,l=q,k?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${3===l?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${3===l?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${3===l?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},df=(a,b)=>a?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${b?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${b?", batchIndices":""});
            `,dg=(a,b,c="f32",d,e=!1,f=32,g=!1,h=32,i=!1)=>{let j=a[1]*b[1],k=a[0]*b[0],l=e?j:f,m=e?f:j;if(m%b[1]!=0||l%b[0]!=0||f%b[1]!=0)throw Error(`tileAHight ${m} must be divisible by workgroupSize[1]${b[1]}, tileAWidth ${l} must be divisible by workgroupSize[0]${b[0]}, tileInner ${f} must be divisible by workgroupSize[1]${b[1]}`);let n=m/b[1],o=l/b[0],p=f/b[1],q=i?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${j};
    let globalColStart = i32(workgroupId.x) * ${k};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${m}; inputRow = inputRow + ${b[1]}) {
        for (var inputCol = localCol; inputCol < ${l}; inputCol = inputCol + ${b[0]}) {
          ${df(e,d)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${f}; inputRow = inputRow + ${b[1]}) {
            for (var inputCol = localCol; inputCol < ${k}; inputCol = inputCol + ${b[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${d?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${c}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${b[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${e?`mm_Asub[k][localRow + innerRow * ${b[1]}];`:`mm_Asub[localRow + innerRow * ${b[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${b[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${b[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${j};

let tileRowA = i32(localId.y) * ${n};
let tileColA = i32(localId.x) * ${o};
let tileRowB = i32(localId.y) * ${p};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${n}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${o}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${df(e,d)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${p}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${d?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${c}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];"}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${c}, ${l}>, ${m}>;
  var<workgroup> mm_Bsub : array<array<${c}, ${k}>, ${f}>;
  const rowPerThread = ${a[1]};
  const colPerThread = ${a[0]};
  const tileInner = ${f};

@compute @workgroup_size(${b[0]}, ${b[1]}, ${b[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${g?"0":"i32(globalId.z)"};
    ${d?`let batchIndices = ${d.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${g?`${Math.ceil(h/f)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${g?`i32(globalId.z) * ${h}`:"0"};

    var acc : array<array<${c}, colPerThread>, rowPerThread>;
    ${q}
  }
`},dh=(a,b,c,d,e=!1,f)=>{let g=a[0].dims,h=a[1].dims,i=g.slice(0,-2),j=h.slice(0,-2),k=d?d.slice(0,-2):c.slice(0,-2),l=bb.size(k),m=g[g.length-2],n=g[g.length-1],o=h[h.length-1],p=n%4==0&&o%4==0,q=m<=8?[4,1,1]:[4,4,1],r=[8,8,1],s=[Math.ceil(o/r[0]/q[0]),Math.ceil(m/r[1]/q[1]),Math.ceil(l/r[2]/q[2])],t=p?4:1,u=[...i,m,n/t],v=u.length,w=[...j,n,o/t],x=w.length,y=[l,m,o/t],z=[{type:6,data:m},{type:6,data:o},{type:6,data:n}];c6(b,z),z.push(...bk(k,u,w));let A=["rank","rank"],B=a.length>2;return B&&(z.push(...bk(a[2].dims)),A.push("rank")),z.push(...bk(y)),{name:"MatMul",shaderCache:{hint:`${q};${b.activation};${p};${e}`,inputDependencies:A},getRunData:()=>({outputs:[{dims:f?f(c):c,dataType:a[0].dataType}],dispatchGroup:{x:s[0],y:s[1],z:s[2]},programUniforms:z}),getShaderSource:c=>{let d=k.length,f=bu("batchDims",a[0].dataType,d,1),g=bi(a[0].dataType),h=br("a",a[0].dataType,v,t),i=br("b",a[1].dataType,x,t),j=bs("result",a[0].dataType,y.length,t),l=[h,i];if(B){let b=e?t:1;l.push(br("bias",a[2].dataType,a[2].dims.length,b))}let m=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];c7(b,m);let n=bi(j.type.tensor),o=((a,b,c,d,e=!1)=>{let[f,g,h,i]=d,j=bi(d[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${f.type.indices}) -> ${c9(a,j)} {
      var value = ${c9(a,j)}(0.0);
      let col = colIn * ${a};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${g.type.indices};
        ${dc("aIndices",g,g.rank-2,f.rank,"batchIndices")}
        ${g.indicesSet("aIndices",g.rank-2,"u32(row)")}
        ${g.indicesSet("aIndices",g.rank-1,"u32(colIn)")}
        value = ${g.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${f.type.indices}) -> ${c9(a,j)} {
      var value = ${c9(a,j)}(0.0);
      let col = colIn * ${a};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${h.type.indices};
        ${dc("bIndices",h,h.rank-2,f.rank,"batchIndices")}
        ${h.indicesSet("bIndices",h.rank-2,"u32(row)")}
        ${h.indicesSet("bIndices",h.rank-1,"u32(colIn)")}
        value = ${h.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${c9(a,j)}) {
      let col = colIn * ${a};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${b?`value = value + ${e?"bias[colIn]":`${c9(a,j)}(bias[row])`};`:""}
        ${c}
        ${i.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `})(t,B,c5(b,j.type.value,n),[f,h,i,j],e);return`
  ${c.registerUniforms(m).registerInternalVariables(f).declareVariables(...l,j)}
  ${o}
  ${p?de(q,r,g,f):dg(q,r,g,f)}
                   `}}}}),fI=O(()=>{fj(),fl(),fr(),fD(),fE(),fF(),fH(),di=(a,b,c,d,e,f,g,h,i)=>{let j="NHWC"===b.format,k=j?a[0].dims[3]:a[0].dims[1],l=c[0],m=j?c[2]:c[3],n=j?c[1]:c[2],o=j?c[3]:c[1],p=j&&(k%4==0||k%3==0)&&o%4==0,q=j?o:m*n,r=j?m*n:o,s=[8,8,1],t=d<=8?[4,1,1]:[4,4,1],u=[Math.ceil(q/s[0]/t[0]),Math.ceil(r/s[1]/t[1]),Math.ceil(l/s[2]/t[2])];aZ("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${u}`);let v=p?j&&k%4!=0?3:4:1,w=s[1]*t[1],x=s[0]*t[0],y=Math.max(s[0]*v,s[1]),z=d%w==0,A=e%x==0,B=f%y==0,C=p?[v,4,4]:[1,1,1],D=[{type:6,data:d},{type:6,data:e},{type:6,data:f},{type:6,data:[b.pads[0],b.pads[1]]},{type:6,data:b.strides},{type:6,data:b.dilations}];c6(b,D),D.push(...bk(a[0].dims,a[1].dims));let E=["rank","rank"];return g&&(D.push(...bk(a[2].dims)),E.push("rank")),D.push(...bk(c)),{name:"Conv2DMatMul",shaderCache:{hint:`${b.cacheKey};${v};${p};${z};${A};${B};${w};${x};${y}`,inputDependencies:E},getRunData:()=>({outputs:[{dims:i?i(c):c,dataType:a[0].dataType}],dispatchGroup:{x:u[0],y:u[1],z:u[2]},programUniforms:D}),getShaderSource:d=>{let e=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];c7(b,e);let f=p?4:1,i=bi(a[0].dataType),k=`
      fn setOutputAtIndex(flatIndex : i32, value : ${p?`vec4<${i}>`:i}) {
        result[flatIndex] = ${p?`vec4<${i}>`:i}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${p?`vec4<${i}>`:i}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${p?"/ 4":""}, value);
      }`,l=[br("x",a[0].dataType,a[0].dims.length,3===v?1:v),br("w",a[1].dataType,a[1].dims.length,f)],m=bs("result",a[0].dataType,c.length,f);if(g){let b=br("bias",a[2].dataType,a[2].dims.length,f);l.push(b),k+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${p?`vec4<${i}>`:i} {
          return bias[coords.${j?"w":"y"}${p?"/ 4":""}];
        }`}return`
        ${db("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${d.registerUniforms(e).declareVariables(...l,m)}
        ${k}
        ${((a,b,c,d,e=!1,f,g=4,h=4,i=4,j="f32")=>{let k=a=>{switch(a){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw Error(`innerElementSize ${a} is not supported.`)}},l=a?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,m=a?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,n=a?"row":"col",o=a?"col":"row",p=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${a?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${n} / outWidth;
    let outCol = ${n} % outWidth;

    let WRow = ${o} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${o} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${o} % inChannels;
    var resData = ${c9(g,j)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${a?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])"} && xCol >= 0 && xCol < ${a?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])"}) {
      ${l}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${(a=>{switch(a){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${j}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw Error(`innerElementSize ${a} is not supported.`)}})(g)}
    }
    return resData;`,q=a?b&&d?`
    let col = colIn * ${g};
    ${p}`:`
    let col = colIn * ${g};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${p}
    }
    return ${c9(g,j)}(0.0);`:d&&c?`
    let col = colIn * ${g};
    ${p}`:`
    let col = colIn * ${g};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${p}
    }
    return ${c9(g,j)}(0.0);`,r=a?d&&c?k(h):`
    let col = colIn * ${h};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${k(h)}
    }
    return ${c9(h,j)}(0.0);`:`
    let col = colIn * ${h};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${k(h)}
    }
    return ${c9(h,j)}(0.0);`,s=c9(i,j),t=a?c9(g,j):c9(h,j),u=a?c9(h,j):c9(g,j),v=c5(f,s,j);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${t} {
      ${a?q:r}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${u} {
      ${a?r:q}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${s}) {
      let col = colIn * ${i};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${a?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${m}
      ${da(e)}
      ${v}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`})(j,z,A,B,g,b,C[0],C[1],C[2],i)}
        ${p?de(t,s,i,void 0,!j,y):dg(t,s,i,void 0,!j,y,!1,void 0,h)}`}}}}),fJ=O(()=>{fj(),fl(),fq(),fr(),fD(),fE(),dj=a=>"number"==typeof a?[a,a,a]:a,dk=(a,b)=>b<=1?a:a+(a-1)*(b-1),dl=(a,b,c,d,e)=>{null==e&&(e=((a,b,c,d=1)=>{let e=dk(b,d);return Math.floor((a[0]*(c-1)-c+e)/2)})(a,b[0],d[0]));let f=[0,0,0,c];for(let c=0;c<3;c++)a[c]+2*e>=b[c]&&(f[c]=Math.trunc((a[c]-b[c]+2*e)/d[c]+1));return f},dm=(a,b,c,d,e,f=!1,g="channelsLast")=>{let h,i,j,k,l;if("channelsLast"===g)[h,i,j,k,l]=a;else if("channelsFirst"===g)[h,l,i,j,k]=a;else throw Error(`Unknown dataFormat ${g}`);let[m,,n,o,p]=b,[q,r,s]=dj(c),[t,u,v]=dj(d),w=dk(n,t),x=dk(o,u),y=dk(p,v),{padInfo:z,outDepth:A,outHeight:B,outWidth:C}=((a,b,c,d,e,f,g,h,i,j)=>{let k,l,m,n;if("VALID"===a&&(a=0),"number"==typeof a){k={top:a,bottom:a,left:a,right:a,front:a,back:a};let o=dl([b,c,d,1],[h,i,j],1,[e,f,g],a);l=o[0],m=o[1],n=o[2]}else if(Array.isArray(a)){if(!a.every((a,b,c)=>a===c[0]))throw Error(`Unsupported padding parameter: ${a}`);k={top:a[0],bottom:a[1],left:a[2],right:a[3],front:a[4],back:a[5]};let o=dl([b,c,d,1],[h,i,j],1,[e,f,g],a[0]);l=o[0],m=o[1],n=o[2]}else if("SAME_UPPER"===a){l=Math.ceil(b/e),m=Math.ceil(c/f),n=Math.ceil(d/g);let a=(l-1)*e+h-b,o=(m-1)*f+i-c,p=(n-1)*g+j-d,q=Math.floor(a/2),r=Math.floor(o/2),s=Math.floor(p/2);k={top:r,bottom:o-r,left:s,right:p-s,front:q,back:a-q}}else throw Error(`Unknown padding parameter: ${a}`);return{padInfo:k,outDepth:l,outHeight:m,outWidth:n}})(e,i,j,k,q,r,s,w,x,y),D=f?m*l:m,E=[0,0,0,0,0];return"channelsFirst"===g?E=[h,D,A,B,C]:"channelsLast"===g&&(E=[h,A,B,C,D]),{batchSize:h,dataFormat:g,inDepth:i,inHeight:j,inWidth:k,inChannels:l,outDepth:A,outHeight:B,outWidth:C,outChannels:D,padInfo:z,strideDepth:q,strideHeight:r,strideWidth:s,filterDepth:n,filterHeight:o,filterWidth:p,effectiveFilterDepth:w,effectiveFilterHeight:x,effectiveFilterWidth:y,dilationDepth:t,dilationHeight:u,dilationWidth:v,inShape:a,outShape:E,filterShape:b}},dn=(a,b,c,d,e,f)=>{let g="channelsLast"===f,h=(g?a[0].dims[3]:a[0].dims[1],[Math.ceil((a=>{let b=1;for(let c=0;c<a.length;c++)b*=a[c];return b})(({x:c.map((a,b)=>b)}).x.map(a=>c[a]))/64),1,1]);aZ("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${h}`);let i=[{type:12,data:bb.size(c)},{type:12,data:d},{type:12,data:e},{type:12,data:b.strides},{type:12,data:b.dilations}];c6(b,i),i.push(...bk(a[0].dims,a[1].dims));let j=["rank","rank"],k=3===a.length;return k&&(i.push(...bk(a[2].dims)),j.push("rank")),i.push(...bk(c)),{name:"Conv3DNaive",shaderCache:{hint:`${b.cacheKey};${g};1;${k}`,inputDependencies:j},getRunData:()=>({outputs:[{dims:c,dataType:a[0].dataType}],dispatchGroup:{x:h[0],y:h[1],z:h[2]},programUniforms:i}),getShaderSource:f=>{let h=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:d.length},{name:"pads",type:"u32",length:e.length},{name:"strides",type:"u32",length:b.strides.length},{name:"dilations",type:"u32",length:b.dilations.length}];c7(b,h);let i=bi(a[0].dataType),j=br("x",a[0].dataType,a[0].dims.length,1),l=br("W",a[1].dataType,a[1].dims.length,1),m=[j,l],n=bs("result",a[0].dataType,c.length,1),o="";if(k){let b=br("bias",a[2].dataType,a[2].dims.length,1);m.push(b),o+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${i} {
          return bias[${g?bp("coords",4,5):bp("coords",1,5)}];
        }`}let p=c9(1,i),q=c5(b,p,i);return`
            ${o}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${j.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${l.getByIndices("aIndices")};
            }
          ${f.registerUniforms(h).declareVariables(...m,n)}
          ${f.mainStart()}
          ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${n.offsetToIndices("global_idx")};
              let batch = ${bp("coords",0,j.rank)};
              let d2 = ${g?bp("coords",j.rank-1,j.rank):bp("coords",1,j.rank)};
              let xFRCCorner = vec3<u32>(${g?bp("coords",1,j.rank):bp("coords",2,j.rank)},
              ${g?bp("coords",2,j.rank):bp("coords",3,j.rank)},
              ${g?bp("coords",3,j.rank):bp("coords",4,j.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${g?bp("uniforms.x_shape",1,j.rank):bp("uniforms.x_shape",2,j.rank)};
              let xShapeZ = ${g?bp("uniforms.x_shape",2,j.rank):bp("uniforms.x_shape",3,j.rank)};
              let xShapeW = ${g?bp("uniforms.x_shape",3,j.rank):bp("uniforms.x_shape",4,j.rank)};
              let xShapeU = ${g?bp("uniforms.x_shape",4,j.rank):bp("uniforms.x_shape",1,j.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${g?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${g?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${g?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${g?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${k?"value = value + getBiasByOutputCoords(coords)":""};
              ${q}
              result[global_idx] = f32(value);
          }`}}}}),fK=O(()=>{fj(),fq(),fr(),fD(),dp=(a,b,c,d)=>{let e=a.length>2,f=e?"value += b[output_channel];":"",g=a[0].dims,h=a[1].dims,i="NHWC"===b.format,j=i?c[3]:c[1],k=j/b.group,l=i&&k>=4?bl(j):1,m=bb.size(c)/l,n=[{type:12,data:m},{type:12,data:b.dilations},{type:12,data:[b.strides[0],b.strides[1]]},{type:12,data:[b.pads[0],b.pads[1]]},{type:12,data:k}];return c6(b,n),n.push(...bk(g,[h[0],h[1],h[2],h[3]/l])),n.push(...bk([c[0],c[1],c[2],c[3]/l])),{name:"GroupedConv",shaderCache:{hint:`${b.cacheKey}_${l}`,inputDependencies:e?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:d?d(c):c,dataType:a[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:n}),getShaderSource:d=>{let j=bs("output",a[0].dataType,c.length,l),k=bi(j.type.tensor),m=c5(b,j.type.value,k),n=br("x",a[0].dataType,g.length),o=br("w",a[1].dataType,h.length,l),p=[n,o];e&&p.push(br("b",a[2].dataType,a[2].dims,l));let q=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:b.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];c7(b,q);let r=i?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${n.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${o.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${n.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${o.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${d.registerUniforms(q).declareVariables(...p,j)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${j.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${i?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${i?1:2}], outputIndices[${i?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${l} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${i?2:1}];

    var value: ${j.type.value} = ${j.type.value}(0);
    ${r}
    ${f}
    ${m}
    ${j.setByOffset("global_idx","value")}
  }`}}},dq=(a,b,c,d)=>{let e=a.length>2,f=bl(c[3]),g=bl(c[2]),h=bb.size(c)/f/g,i=[a[0].dims[0],a[0].dims[1],a[0].dims[2],a[0].dims[3]/f],j=[a[1].dims[0],a[1].dims[1],a[1].dims[2],a[1].dims[3]/f],k=[c[0],c[1],c[2],c[3]/f],l=[{type:12,data:h},{type:6,data:[b.strides[0],b.strides[1]]},{type:6,data:[b.pads[0],b.pads[1]]}];c6(b,l),l.push(...bk(i,j,k));let m=(g-1)*b.strides[1]+j[1];return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${b.cacheKey};${f};${g};${m};${j[0]};${j[1]}`,inputDependencies:e?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:d?d(c):c,dataType:a[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:l}),getShaderSource:c=>{let d=bs("output",a[0].dataType,k.length,f),h=bi(d.type.tensor),l=c5(b,d.type.value,h),n=br("x",a[0].dataType,i.length,f),o=br("w",a[1].dataType,j.length,f),p=[n,o];e&&p.push(br("b",a[2].dataType,a[2].dims,f));let q=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return c7(b,q),`
  ${c.registerUniforms(q).declareVariables(...p,d)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${g}u;
    let col = (index1 % width1) * ${g}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${n.type.value}, ${m}>;
    var values: array<${d.type.value}, ${g}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${j[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${m}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${n.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${n.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${j[1]}; w_width++) {
          let w_val = ${o.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${g}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${g}u; i++) {
      var value = values[i];
      ${e?"value += b[output_channel];":""}
      ${l}
      ${d.set("batch","row","col + i","output_channel","value")};
    }
  }`}}}}),fL=O(()=>{fq(),fI(),fJ(),fH(),fK(),fD(),fG(),fs(),dr=[2,3,1,0],ds=(a,b)=>{let c=a.kernelShape.slice();c.length<b[1].dims.length-2&&c.push(...Array(b[1].dims.length-2-c.length).fill(0));for(let a=2;a<b[1].dims.length;++a)0===c[a-2]&&(c[a-2]=b[1].dims[a]);let d=a.pads.slice();bc.adjustPadsBasedOnAutoPad(b[0].dims,a.strides,a.dilations,c,d,"NHWC"===a.format,a.autoPad);let e=Object.assign({},a);return Object.assign(e,{kernelShape:c,pads:d}),e},dt=a=>{let b=c8(a),c=a.format;return{autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][a.auto_pad],format:c,dilations:a.dilations,group:a.group,kernelShape:a.kernel_shape,pads:a.pads,strides:a.strides,wIsConst:a.w_is_const(),...b,cacheKey:`${a.format};${b.activation};`}},du=(a,b,c,d)=>{var e,f,g,h,i,j;let k,l,m,n,o,p,q="NHWC"===c.format,r=(e=b[0].dims,f=b[1].dims,g=c.dilations,h=c.pads,i=c.strides,j=q,k=e[0],m=(l=e.slice(j?1:2,j?3:4)).length,n=f[0],o=f.slice(2).map((a,b)=>a+(a-1)*(g[b]-1)),(p=l.map((a,b)=>a+h[b]+h[b+m]).map((a,b)=>Math.floor((a-o[b]+i[b])/i[b]))).splice(0,0,k),p.splice(j?3:1,0,n),p);if(1!==c.group){let e=[b[0]];if(q){let d=a.kernelCustomData.wT??a.compute(by(b[1],dr),{inputs:[1],outputs:[c.wIsConst?-2:-1]})[0];c.wIsConst&&!a.kernelCustomData.wT&&(a.kernelCustomData.wT=d),e.push(d)}else e.push(b[1]);3===b.length&&e.push(b[2]),!a.adapterInfo.isArchitecture("ampere")&&q&&b[1].dims[0]===c.group&&1===b[1].dims[1]&&1===c.dilations[0]&&1===c.dilations[1]?a.compute(dq(e,c,r,d),{inputs:e}):a.compute(dp(e,c,r,d),{inputs:e});return}let s=3===b.length,t=b[0].dims[q?1:2],u=b[0].dims[q?2:3],v=b[0].dims[q?3:1],w=b[1].dims[2],x=b[1].dims[3],y=r[q?1:2],z=r[q?2:3],A=r[q?3:1],B=q&&w===t&&x===u&&0===c.pads[0]&&0===c.pads[1];if(B||1===w&&1===x&&1===c.dilations[0]&&1===c.dilations[1]&&1===c.strides[0]&&1===c.strides[1]&&0===c.pads[0]&&0===c.pads[1]){let e=r[0],f,g,h,i=[];if(q){let d=a.kernelCustomData.wT??a.compute(by(b[1],dr),{inputs:[1],outputs:[c.wIsConst?-2:-1]})[0];if(c.wIsConst&&!a.kernelCustomData.wT&&(a.kernelCustomData.wT=d),B){let a=t*u*v;f=b[0].reshape([1,e,a]),g=d.reshape([1,a,A]),h=[1,e,A]}else f=b[0].reshape([e,t*u,v]),g=d.reshape([1,v,A]),h=[e,y*z,A];i.push(f),i.push(g)}else f=b[0].reshape([e,v,t*u]),g=b[1].reshape([1,A,v]),h=[e,A,y*z],i.push(g),i.push(f);s&&i.push(b[2]);let j=h[2],k=i[0].dims[i[0].dims.length-1];j<8&&k<8?a.compute(dd(i,c,r,h,q,d),{inputs:i}):a.compute(dh(i,c,r,h,q,d),{inputs:i});return}let C=a.kernelCustomData.wT??a.compute(by(b[1],dr),{inputs:[1],outputs:[c.wIsConst?-2:-1]})[0];c.wIsConst&&!a.kernelCustomData.wT&&(a.kernelCustomData.wT=C);let D=[b[0],C];s&&D.push(b[2]);let E=q?y*z:A,F=q?A:y*z,G=w*x*v;a.compute(di(D,c,r,E,F,G,s,!0,d),{inputs:D})},dv=(a,b)=>{var c,d,e,f,g;if(((a,b)=>{if(!a||2!==a.length&&3!==a.length)throw Error("Conv requires 2 or 3 inputs");if(a[0].dims.length>5)throw Error("greater than 5D is not supported");if(a[0].dims.length!==a[1].dims.length)throw Error("filter does not have same dimension as input");if(a[0].dims["NHWC"===b.format?a[0].dims.length-1:1]!==a[1].dims[1]*b.group)throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(3===a.length&&(1!==a[2].dims.length||a[1].dims[0]!==a[2].dims[0]))throw Error("invalid bias");let c=a[0].dims.length-2;if(b.dilations.length!==c)throw Error(`dilations should be ${c}D`);if(b.strides.length!==c)throw Error(`strides should be ${c}D`);if(b.pads.length!==2*c)throw Error(`pads should be ${2*c}D`);if(0!==b.kernelShape.length&&b.kernelShape.length!==a[1].dims.length-2)throw Error("invalid kernel shape")})(a.inputs,b),3===a.inputs[0].dims.length){let e,f,g,h,i,j,k;c=a,e="NHWC"===(d=b).format,f=[c.inputs[0].reshape(e?[c.inputs[0].dims[0],1,c.inputs[0].dims[1],c.inputs[0].dims[2]]:[c.inputs[0].dims[0],c.inputs[0].dims[1],1,c.inputs[0].dims[2]]),c.inputs[1].reshape([c.inputs[1].dims[0],c.inputs[1].dims[1],1,c.inputs[1].dims[2]])],3===c.inputs.length&&f.push(c.inputs[2]),g=[0,d.pads[0],0,d.pads[1]],h=[1].concat(d.strides),i=[1].concat(d.dilations),j=[1].concat(d.kernelShape),k=ds({...d,pads:g,strides:h,dilations:i,kernelShape:j},f),du(c,f,k,a=>e?[a[0],a[2],a[3]]:[a[0],a[1],a[3]])}else if(5===a.inputs[0].dims.length){let c,d,h,i;e=a,f=a.inputs,c="NHWC"===(g=b).format?"channelsLast":"channelsFirst",d=ds(g,f),h="NOTSET"===g.autoPad?g.pads:g.autoPad,i=dm(f[0].dims,f[1].dims,g.strides,g.dilations,h,!1,c),e.compute(dn(f,d,i.outShape,[i.filterDepth,i.filterHeight,i.filterWidth],[i.padInfo.front,i.padInfo.top,i.padInfo.left],c))}else{let c=ds(b,a.inputs);du(a,a.inputs,c)}}}),fM=O(()=>{fj(),fl(),fq(),fr(),dw=(a,b,c)=>{let d=a.length>2,e=b.outputShape,f="NHWC"===b.format,g=b.group,h=a[1].dims,i=h[2]/g,j=h[3],k=f?bl(i):1,l=f?bl(j):1,m=f?1===j?k:l:1,n=bb.size(e)/l,o=[Math.ceil(n/64),1,1];aZ("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${o}`);let p=["rank","rank"],q=[b.strides[0],b.strides[1]],r=[b.kernelShape[f?1:2],b.kernelShape[f?2:3]],s=[b.dilations[0],b.dilations[1]],t=[r[0]+(b.dilations[0]<=1?0:(b.kernelShape[f?1:2]-1)*(b.dilations[0]-1)),r[1]+(b.dilations[1]<=1?0:(b.kernelShape[f?2:3]-1)*(b.dilations[1]-1))],u=[t[0]-1-Math.floor((b.pads[0]+b.pads[2])/2),t[1]-1-Math.floor((b.pads[1]+b.pads[3])/2)],v=[{type:12,data:n},{type:12,data:q},{type:12,data:r},{type:12,data:s},{type:12,data:t},{type:6,data:u},{type:12,data:i},{type:12,data:j},...bk(a[0].dims,a[1].dims)];return d&&(v.push(...bk(a[2].dims)),p.push("rank")),v.push(...bk(e)),{name:"ConvTranspose2D",shaderCache:{hint:`${b.cacheKey};${k}${m}${l}${1===j}`,inputDependencies:p},getRunData:()=>({dispatchGroup:{x:o[0],y:o[1],z:o[2]},outputs:[{dims:c?c(e):e,dataType:a[0].dataType}],programUniforms:v}),getShaderSource:b=>{let c=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:q.length},{name:"filter_dims",type:"u32",length:r.length},{name:"dilations",type:"u32",length:r.length},{name:"effective_filter_dims",type:"u32",length:t.length},{name:"pads",type:"i32",length:u.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],g=bi(a[0].dataType),h=f?1:2,i=f?2:3,n=f?3:1,o=br("W",a[1].dataType,a[1].dims.length,m),p=br("Dy",a[0].dataType,a[0].dims.length,k),s=[p,o];d&&s.push(br("bias",a[2].dataType,[e[n]].length,l));let v=bs("result",a[0].dataType,e.length,l),w=`
            let outputIndices = ${v.offsetToIndices(`global_idx * ${l}`)};
            let batch = ${v.indicesGet("outputIndices",0)};
            let d1 = ${v.indicesGet("outputIndices",n)};
            let r = ${v.indicesGet("outputIndices",h)};
            let c = ${v.indicesGet("outputIndices",i)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${v.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${g}(dyRCorner) + ${g}(wR)) / ${g}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${g}(uniforms.Dy_shape[${h}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }

              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${g}(dyCCorner) + ${g}(wC)) / ${g}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${g}(uniforms.Dy_shape[${i}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + ${k}) {
                  let xValue = ${f?p.getByOffset(`${p.indicesToOffset(`${p.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${k}`):p.get("batch","inputChannel","idyR","idyC")};
                  ${(()=>{let a="";if(1===k)a+=`
        let w_offset = ${o.indicesToOffset(`${o.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
        let wValue = ${o.getByOffset(`w_offset / ${m}`)};
        dotProd = dotProd + xValue * wValue;`;else if(1===j)a+=`
          let wValue = ${o.getByOffset(`${o.indicesToOffset(`${o.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)} / ${m}`)};
          dotProd = dotProd + dot(xValue, wValue);`;else for(let b=0;b<k;b++)a+=`
            let wValue${b} = ${o.getByOffset(`${o.indicesToOffset(`${o.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${b}, wOutChannel)`)} / ${m}`)};
            dotProd = dotProd + xValue[${b}] * wValue${b};`;return a})()}
                  inputChannel = inputChannel + ${k};
                }
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${d?` + bias[d1 / ${l}]`:""};
            ${v.setByOffset("global_idx","value")};
          `;return`
    ${b.registerUniforms(c).declareVariables(...s,v)}
      ${b.mainStart()}
      ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${w}}`}}}}),fN=O(()=>{fM(),fD(),fs(),dx=(a,b,c,d,e,f)=>(a-1)*b+c+(d-1)*e+1-f,dy=(a,b,c,d,e)=>{let f=Math.floor(a/2);"SAME_UPPER"===b?(c[d]=f,c[e]=a-f):"SAME_LOWER"===b&&(c[d]=a-f,c[e]=f)},dz=(a,b)=>{let c=a.kernelShape.slice();if(0===a.kernelShape.length||0===a.kernelShape.reduce((a,b)=>a*b,1)){c.length=0;for(let a=2;a<b[1].dims.length;++a)c.push(b[1].dims[a])}let d="NHWC"===a.format;c.splice(0,0,b[1].dims[0]),c.splice(d?3:1,0,b[1].dims[1]);let e=a.pads.slice(),f=a.outputShape.slice(),g=a.outputPadding.slice(),h=b[0].dims,i=a.dilations.slice();0===i.reduce((a,b)=>a+b,0)&&(i=Array(b[0].dims.length-2).fill(1));let j=a.strides.slice();0===j.reduce((a,b)=>a+b,0)&&(j=Array(b[0].dims.length-2).fill(1)),((a,b,c,d,e,f,g,h,i,j)=>{let k=a.length-2,l=0===j.length;i.length<k&&i.push(...Array(k-i.length).fill(0));let m=a[0],n=b[h?3:1]*e;for(let e=0,m=a.length-k-!!h;e<k;++e,++m){let h=a[m],n=l?h*g[e]:j[e];dy(dx(h,g[e],f[e],b[m],c[e],n),d,f,e,e+k),l&&j.push(g[e]*(h-1)+i[e]+(b[m]-1)*c[e]+1-f[e]-f[e+k])}j.splice(0,0,m),j.splice(h?3:1,0,n)})(h,c,i,a.autoPad,a.group,e,j,d,g,f);let k=Object.assign({},a);return Object.assign(k,{kernelShape:c,pads:e,outputPadding:g,outputShape:f,dilations:i,strides:j}),k},dA=a=>{let b=c8(a),c=a.format,d=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof a.autoPad>"u"?0:a.autoPad],e=a.dilations,f=a.group,g=a.kernelShape,h=a.pads,i=a.strides,j=a.wIsConst();return{autoPad:d,format:c,dilations:e,group:f,kernelShape:g,outputPadding:a.outputPadding,outputShape:a.outputShape,pads:h,strides:i,wIsConst:j,...b,cacheKey:`${a.format};${b.activation};`}},dB=(a,b,c,d)=>{let e=a.kernelCustomData.wT??a.compute(by(b[1],[2,3,0,1]),{inputs:[1],outputs:[c.wIsConst?-2:-1]})[0];c.wIsConst&&!a.kernelCustomData.wT&&(a.kernelCustomData.wT=e);let f=[b[0],e];3===b.length&&f.push(b[2]),a.compute(dw(f,c,d),{inputs:f})},dC=(a,b)=>{if(((a,b)=>{if(!a||2!==a.length&&3!==a.length)throw Error("Conv requires 2 or 3 inputs");if(4!==a[0].dims.length&&3!==a[0].dims.length)throw Error("currently only support 2-dimensional conv");if(a[0].dims.length!==a[1].dims.length)throw Error("filter does not have same dimension as input");if(a[0].dims["NHWC"===b.format?a[0].dims.length-1:1]!==a[1].dims[0])throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let c=a[1].dims[1]*b.group;if(3===a.length&&(1!==a[2].dims.length||a[2].dims[0]!==c))throw Error("invalid bias");let d=a[0].dims.length-2;if(b.dilations.reduce((a,b)=>a+b,0)>0&&b.dilations.length!==d)throw Error(`dilations should be ${d}D`);if(b.strides.reduce((a,b)=>a+b,0)>0&&b.strides.length!==d)throw Error(`strides should be ${d}D`);if(b.pads.reduce((a,b)=>a+b,0)>0&&b.pads.length!==2*d)throw Error(`pads should be ${2*d}D`);if(b.outputPadding.length!==d&&0!==b.outputPadding.length)throw Error(`output_padding should be ${d}D`);if(b.kernelShape.reduce((a,b)=>a+b,0)>0&&0!==b.kernelShape.length&&b.kernelShape.length!==a[1].dims.length-2)throw Error("invalid kernel shape");if(0!==b.outputShape.length&&b.outputShape.length!==a[0].dims.length-2)throw Error("invalid output shape")})(a.inputs,b),3===a.inputs[0].dims.length){var c,d;let e,f,g,h,i,j,k,l;c=a,e="NHWC"===(d=b).format,f=[c.inputs[0].reshape(e?[c.inputs[0].dims[0],1,c.inputs[0].dims[1],c.inputs[0].dims[2]]:[c.inputs[0].dims[0],c.inputs[0].dims[1],1,c.inputs[0].dims[2]]),c.inputs[1].reshape([c.inputs[1].dims[0],c.inputs[1].dims[1],1,c.inputs[1].dims[2]])],3===c.inputs.length&&f.push(c.inputs[2]),(0===(g=d.kernelShape).length||0===g[0])&&(g=[c.inputs[1].dims[2]]),(0===(h=d.dilations).length||0===h[0])&&(h=[1]),(0===(i=d.strides).length||0===i[0])&&(i=[1]),0===(j=d.pads).length&&(j=[0,0]),j=[0,j[0],0,j[1]],i=[1].concat(i),h=[1].concat(h),g=[1].concat(g),k=[0].concat(k=d.outputPadding),l=dz({...d,pads:j,strides:i,dilations:h,kernelShape:g,outputPadding:k},f),dB(c,f,l,a=>e?[a[0],a[2],a[3]]:[a[0],a[1],a[3]])}else{let c=dz(b,a.inputs);dB(a,a.inputs,c)}}}),fO=O(()=>{fj(),fq(),fp(),fr(),dD=(a,b)=>{var c,d,e,f;let g,h,i,j,k,l,m=a.inputs[0].dims,n=a.inputs[0].dataType,o=a.inputs[1];a.compute((c=n,d=m,e=o,f=b,g=bb.size(d),h=d.length,i=br("input",c,h),j=bs("output",c,h),k=6===e.dataType?e.getInt32Array()[0]:Number(e.getBigInt64Array()[0]),l=bb.normalizeAxis(k,h),{name:"CumSum",shaderCache:{hint:f.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:d,dataType:c}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},{type:12,data:l},...bk(d,d)]}),getShaderSource:a=>{let b=` i32(${i.indicesGet("inputIndices","uniforms.axis")}) `,c=bp("uniforms.input_shape","uniforms.axis",h),d=f.reverse?b+(f.exclusive?" + 1":""):"0",e=f.reverse?c:b+(f.exclusive?"":" + 1");return`
                ${a.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(i,j)}
                ${a.mainStart()}
                  ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${j.offsetToIndices("global_idx")};
                  var sum = ${j.type.value}(0);
                  let first : i32 = ${d};
                  let last : i32 = ${e};
                  for (var i : i32 = first; i < last; i++) {
                    ${i.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${i.getByIndices("inputIndices")};
                  }
                  ${j.setByOffset("global_idx","sum")};
                }`}}),{inputs:[0]})},dE=a=>{let b=1===a.exclusive,c=1===a.reverse;return a8({exclusive:b,reverse:c})}}),fP=O(()=>{fj(),fq(),fp(),fr(),dF=(a,b)=>{var c,d;let e,f,g,h,i,j,k,l,m,n,o,p,q,r;(a=>{if(!a||1!==a.length)throw Error("DepthToSpace requires 1 input.");if(4!==a[0].dims.length)throw Error("DepthToSpace requires 4D input.")})(a.inputs),a.compute((c=a.inputs[0],k="NHWC"===(d=b).format,l=d.blocksize,m="DCR"===d.mode,k?([e,f,g,h]=c.dims,i=m?[e,f,g,l,l,h/l**2]:[e,f,g,h/l**2,l,l],j=m?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([e,f,g,h]=[c.dims[0],c.dims[2],c.dims[3],c.dims[1]],i=m?[e,l,l,h/l**2,f,g]:[e,h/l**2,l,l,f,g],j=m?[0,3,4,1,5,2]:[0,1,4,2,5,3]),o=(n=c.reshape(i)).dims.length,p=c.dataType,q=br("a",p,o),r=bs("output",p,o),{name:"DepthToSpace",shaderCache:{hint:`${c.dims};${d.blocksize};${d.mode}`,inputDependencies:["rank"]},getRunData:a=>{let b=k?[e,f*l,g*l,h/l**2]:[e,h/l**2,f*l,g*l],c=bb.size(b),d=n.dims,i=bb.sortBasedOnPerm(d,j);return{outputs:[{dims:b,dataType:a[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...bk(d,i)]}},getShaderSource:a=>`
  ${a.registerUniform("output_size","u32").declareVariables(q,r)}

  ${((a,b,c,d)=>{let e=[];e.push(`fn perm(i: ${d.type.indices}) -> ${c.type.indices} {
    var a: ${c.type.indices};`);for(let d=0;d<b;++d)e.push(c.indicesSet("a",a[d],`i[${d}]`));return e.push("return a;}"),e.join(`
`)})(j,o,q,r)}

  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${r.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${r.setByOffset("global_idx",q.getByIndices("aIndices"))}
  }`}))},dG=a=>a8({blocksize:a.blocksize,mode:a.mode,format:a.format})}),fQ=O(()=>{fj(),fq(),fp(),fr(),dJ="^"+(dI="("+(dH="[a-zA-Z]|\\.\\.\\.")+")+")+"$",dK="^"+("("+dI+",)*")+dI+"$",dL=class{constructor(a=-1){this.symbolToIndices=new Map,this.inputIndex=a}addSymbol(a,b){let c=this.symbolToIndices.get(a);void 0===c?c=[b]:c.push(b),this.symbolToIndices.set(a,c)}},dM=class{constructor(a,b){this.equation=b,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=[],this.outputDims=[];let[c,d]=b.includes("->")?b.split("->",2):[b,""];if(!c.match(RegExp(dK)))throw Error("Invalid LHS term");if(c.split(",").forEach((b,c)=>{let d=a[c].dims.slice();if(!b.match(RegExp(dJ)))throw Error("Invalid LHS term");let e=this.processTerm(b,!0,d,c);this.lhs.push(e)}),""===d)d+=[...this.symbolToInfo.entries()].filter(([a,b])=>1===b.count||"..."===a).map(([a])=>a).join("");else if(!d.match(RegExp(dI)))throw Error("Invalid RHS");d.match(RegExp(dH,"g"))?.forEach(a=>{if("..."===a)this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let b=this.symbolToInfo.get(a);if(void 0===b)throw Error("Invalid RHS symbol");this.outputDims.push(b.dimValue)}}),this.rhs=this.processTerm(d,!1,this.outputDims)}addSymbol(a,b,c){let d=this.symbolToInfo.get(a);if(void 0!==d){if(d.dimValue!==b&&1!==d.count)throw Error("Dimension mismatch");d.count++,d.inputIndices.push(c)}else d={count:1,dimValue:b,inputIndices:[c]};this.symbolToInfo.set(a,d)}processTerm(a,b,c,d=-1){let e=c.length,f=!1,g=[],h=0;if(!a.match(RegExp(dJ))&&!b&&""!==a)throw Error("Invalid LHS term");let i=a.match(RegExp(dH,"g")),j=new dL(d);return i?.forEach((a,k)=>{if("..."===a){if(f)throw Error("Only one ellipsis is allowed per input term");f=!0;let a=e-i.length+1;if(a<0)throw Error("Ellipsis out of bounds");if(g=c.slice(h,h+a),this.hasEllipsis){if(this.ellipsisDims.length!==g.length||this.ellipsisDims.toString()!==g.toString())throw Error("Ellipsis dimensions mismatch")}else if(b)this.hasEllipsis=!0,this.ellipsisDims=g;else throw Error("Ellipsis must be specified in the LHS");for(let a=0;a<g.length;a++){let b=String.fromCharCode(48+a);j.addSymbol(b,k+a),this.addSymbol(b,c[h++],d)}}else j.addSymbol(a,k+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(a,c[h++],d)}),j}},dN=(a,b)=>{var c,d,e,f;let g,h,i,j,k=new dM(a.inputs,b.equation),l=k.outputDims,m=a.inputs.map((a,b)=>a.dims);a.compute((c=m,d=a.inputs[0].dataType,e=k,f=l,g=c.map(a=>a.length).map((a,b)=>br(`input${b}`,d,a)),h=bb.size(f),i=bs("output",d,f.length),j=[...e.symbolToInfo.keys()].filter(a=>!e.rhs.symbolToIndices.has(a)),{name:"Einsum",shaderCache:{hint:e.equation,inputDependencies:c.map(()=>"rank")},getRunData:()=>{let a=j.filter(a=>e.symbolToInfo.has(a)).map(a=>({type:12,data:e.symbolToInfo.get(a)?.dimValue||0}));a.push({type:12,data:h});let b=c.map((a,b)=>[...bk(a)]).reduce((a,b)=>a.concat(b),a);return b.push(...bk(f)),{outputs:[{dims:f,dataType:d}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:b}},getShaderSource:a=>{let b=[],c=[],d=[],f=[],h=[],k=e.symbolToInfo.size===e.rhs.symbolToIndices.size;e.symbolToInfo.forEach((a,j)=>{if(e.rhs.symbolToIndices.has(j)){let c=e.rhs.symbolToIndices.get(j)?.[0];void 0!==c&&e.lhs.forEach((d,e)=>{if(a.inputIndices.includes(e)){let a=d.symbolToIndices.get(j);if(void 0===a)throw Error("Invalid symbol error");a.forEach(a=>{b.push(`${g[e].indicesSet(`input${e}Indices`,a,i.indicesGet("outputIndices",c))}`)})}})}else e.lhs.forEach((b,d)=>{if(a.inputIndices.includes(d)){let a=b.symbolToIndices.get(j);if(void 0===a)throw Error("Invalid symbol error");a.forEach(a=>{c.push(`${g[d].indicesSet(`input${d}Indices`,a,`${j}`)}`)}),h.push(`prod *= ${g[d].getByIndices(`input${d}Indices`)};`)}}),d.push(`for(var ${j}: u32 = 0; ${j} < uniforms.${j+"_max"}; ${j}++) {`),f.push("}")});let l=k?[...b,`let sum = ${g.map((a,b)=>a.getByIndices(`input${b}Indices`)).join(" * ")};`]:[...b,"var sum = 0.0;",...d,...c,"var prod = 1.0;",...h,"sum += prod;",...f];return`
            ${a.registerUniforms(j.map(a=>({name:`${a+"_max"}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...g,i)}

            ${a.mainStart()}
            ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${i.offsetToIndices("global_idx")};
            ${g.map((a,b)=>`var input${b}Indices: ${g[b].type.indices};`).join(`
`)}
            ${l.join(`
`)};
            ${i.setByOffset("global_idx","sum")};
          }`}}))},dO=a=>{let b=a.equation.replace(/\s+/g,"");return a8({equation:b})}}),fR=O(()=>{fj(),fq(),fr(),dP=(a,b)=>{let c=a.length-b.length,d=[];for(let b=0;b<c;++b)d.push(a[b]);for(let e=0;e<b.length;++e)d.push(1===b[e]?a[e+c]:b[e]);return d},dQ=a=>{var b;let c,d,e,f,g,h,i,j,k,l;(a=>{if(!a||2!==a.length)throw Error("Expand requires 2 input.");let b=a[0].dims,c=Array.from(a[1].getBigInt64Array(),Number),d=c.length<b.length?0:c.length-b.length,e=b.length<c.length?0:b.length-c.length;for(;d<c.length&&e<b.length;++d,++e)if(c[d]!==b[e]&&1!==c[d]&&1!==b[e])throw Error("Expand requires shape to be broadcastable to input")})(a.inputs),a.compute((f=(c=e=(b=a.inputs)[0].dims,d=Array.from(b[1].getBigInt64Array(),Number),c.length>d.length?dP(c,d):dP(d,c)),h=9===(g=b[0].dataType)||1===bb.size(e),i=9===g||e.length>0&&e[e.length-1]%4==0?4:1,j=h||f.length>0&&f[f.length-1]%4==0?4:1,l=[{type:12,data:k=Math.ceil(bb.size(f)/j)},...bk(e,f)],{name:"Expand",shaderCache:{hint:`${f.length};${i}${j}`,inputDependencies:["rank"]},getShaderSource:a=>{let b=br("input",g,e.length,i),c=bs("output",g,f.length,j),d;if(9===g){let a=(a,d,e="")=>`
          let outputIndices${d} = ${c.offsetToIndices(`outputOffset + ${d}u`)};
          let offset${d} = ${b.broadcastedIndicesToOffset(`outputIndices${d}`,c)};
          let index${d} = offset${d} / 4u;
          let component${d} = offset${d} % 4u;
          ${a}[${d}] = ${e}(${b.getByOffset(`index${d}`)}[component${d}]);
        `;d=`
        let outputOffset = global_idx * ${j};
        var data = vec4<u32>(0);
        ${a("data",0,"u32")}
        ${a("data",1,"u32")}
        ${a("data",2,"u32")}
        ${a("data",3,"u32")}
        ${c.setByOffset("global_idx","data")}
      }`}else d=`
        let outputIndices = ${c.offsetToIndices(`global_idx * ${j}`)};
        let inputOffset = ${b.broadcastedIndicesToOffset("outputIndices",c)};
        let data = ${c.type.value}(${b.getByOffset(`inputOffset / ${i}`)});
        ${c.setByOffset("global_idx","data")}
      }`;return`
    ${a.registerUniform("vec_size","u32").declareVariables(b,c)}
    ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${d}`},getRunData:()=>({outputs:[{dims:f,dataType:b[0].dataType}],dispatchGroup:{x:Math.ceil(k/64)},programUniforms:l})}),{inputs:[0]})}}),fS=O(()=>{fj(),fq(),fr(),fz(),dR=a=>{var b;let c,d,e,f;a.inputs.length<2||0===bb.size(a.inputs[1].dims)?cO(a):a.compute((c=(b=a.inputs)[0].dataType,d=bb.size(b[0].dims),f=(e=bb.size(b[1].dims))%4==0,{name:"FastGeluWithBias",shaderCache:{hint:`${f}`,inputDependencies:["type","type"]},getShaderSource:a=>{let b=br("x",c,[1],4),d=br("bias",c,[1],4),e=bs("y",c,[1],4),g=a=>`
      let bias${a}_offset: u32 = (global_idx * 4 + ${a}) % uniforms.bias_size;
      let bias${a} = ${d.getByOffset(`bias${a}_offset / 4`)}[bias${a}_offset % 4];`,h=f?`
      let bias = ${d.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${g(0)}${g(1)}${g(2)}${g(3)}
      let bias = ${b.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms([{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}]).declareVariables(b,d,e)}

    ${cM(bj(c))}

    ${a.mainStart(bg)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${b.getByOffset("global_idx")};
      ${h}
      let x_in = x + bias;
      ${e.setByOffset("global_idx",cN("x_in"))}
    }`},getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(d/4)},{type:12,data:e}],dispatchGroup:{x:Math.ceil(d/bg/4)}})}))}}),fT=O(()=>{fj(),fq(),fp(),fr(),dS=a=>a8({axis:a.axis}),dT=(a,b)=>{var c,d;let e,f,g,h,i,j,k,l,m;(a=>{if(!a||2!==a.length)throw Error("Gather requires 2 inputs.")})(a.inputs),a.compute((c=a.inputs,d=b,e=c[0].dims,f=c[1].dims,g=e.length,h=bb.normalizeAxis(d.axis,g),(i=e.slice(0)).splice(h,1,...f),j=e[h],k=9===c[0].dataType?4:1,m=[{type:12,data:l=Math.ceil(bb.size(i)/k)},{type:6,data:j},{type:12,data:h},...bk(c[0].dims,c[1].dims,i)],{name:"Gather",shaderCache:{hint:d.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:i,dataType:c[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:m}),getShaderSource:a=>{let b=br("data",c[0].dataType,c[0].dims.length,k),d=br("inputIndices",c[1].dataType,c[1].dims.length),e=bs("output",c[0].dataType,i.length,k),j=a=>{let c=f.length,e=`var indicesIndices${a}  = ${d.type.indices}(0);`;for(let b=0;b<c;b++)e+=`${c>1?`indicesIndices${a}[${b}]`:`indicesIndices${a}`} = ${i.length>1?`outputIndices${a}[uniforms.axis + ${b}]`:`outputIndices${a}`};`;e+=`
          var idx${a} = ${d.getByIndices(`indicesIndices${a}`)};
          if (idx${a} < 0) {
            idx${a} = idx${a} + uniforms.axisDimLimit;
          }
          var dataIndices${a} : ${b.type.indices};
        `;for(let b=0,d=0;b<g;b++)b===h?(e+=`${g>1?`dataIndices${a}[${b}]`:`dataIndices${a}`} = u32(idx${a});`,d+=c):(e+=`${g>1?`dataIndices${a}[${b}]`:`dataIndices${a}`} = ${i.length>1?`outputIndices${a}[${d}]`:`outputIndices${a}`};`,d++);return e},l;if(9===c[0].dataType){let a=(a,c,d="")=>`
          let outputIndices${c} = ${e.offsetToIndices(`outputOffset + ${c}u`)};
          ${j(c)};
          let offset${c} = ${b.indicesToOffset(`dataIndices${c}`)};
          let index${c} = offset${c} / 4u;
          let component${c} = offset${c} % 4u;
          ${a}[${c}] = ${d}(${b.getByOffset(`index${c}`)}[component${c}]);
        `;l=`
        let outputOffset = global_idx * ${k};
        var value = vec4<u32>(0);
        ${a("value",0,"u32")}
        ${a("value",1,"u32")}
        ${a("value",2,"u32")}
        ${a("value",3,"u32")}
        ${e.setByOffset("global_idx","value")}
      `}else l=`
      let outputIndices = ${e.offsetToIndices("global_idx")};
      ${j("")};
      let value = ${b.getByIndices("dataIndices")};
      ${e.setByOffset("global_idx","value")};
      `;return`
      ${a.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(b,d,e)}
      ${a.mainStart()}
        ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${l}
      }`}}))}}),fU=O(()=>{fj(),fq(),fr(),dU=(a,b)=>{var c,d,e,f,g,h;let i,j,k=a.inputs,l=k[0].dims,m=k[0].dataType,n=k[1].dims,o=n[n.length-1],p=bb.sizeToDimension(n,n.length-1),q=bb.sizeFromDimension(l,b.batchDims+o),r=bb.sizeToDimension(l,b.batchDims),s=bb.sizeFromDimension(l,b.batchDims),t=Array(o),u=q;for(let a=0;a<o;++a)t[o-1-a]=u,u*=l[b.batchDims+o-1-a];let v=(c=a,d=k[1],e=t,f=b.batchDims,g=l,i=[{type:12,data:h=p},{type:12,data:f},{type:12,data:g},{type:12,data:e},{type:12,data:p/r},{type:12,data:s},{type:12,data:o}],j=[h],i.push(...bk(d.dims,j)),c.compute({name:"computeSliceOffsets",shaderCache:{hint:`${g.length}_${e.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:j,dataType:c.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:i}),getShaderSource:a=>{let b=br("indices_data",d.dataType,d.dims.length),c=bs("input_slice_offsets_data",12,1,1),f=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:g.length},{name:"sizes_from_slice_dims_data",type:"u32",length:e.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${a.registerUniforms(f).declareVariables(b,c)}
  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${1===g.length?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${1===e.length?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`}},{inputs:[d],outputs:[-1]})[0]),w=b.batchDims+o;if(w>l.length)throw Error("last dimension of indices must not be larger than rank of input tensor");let x=n.slice(0,-1).concat(l.slice(w)),y=bb.size(x),z=[{type:12,data:y},{type:12,data:q},...bk(k[0].dims,v.dims,x)];a.compute({name:"GatherND",shaderCache:{hint:b.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:x,dataType:m}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:z}),getShaderSource:a=>{let b=br("data",k[0].dataType,k[0].dims.length),c=br("slice_offsets",12,v.dims.length),d=bs("output",k[0].dataType,x.length);return`
          ${a.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(b,c,d)}
            ${a.mainStart()}
            ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`}},{inputs:[k[0],v]})},dV=a=>({batchDims:a.batch_dims,cacheKey:""})}),fV=O(()=>{fj(),fq(),fp(),fr(),dW=(a,b)=>{var c,d;let e,f,g,h,i,j,k,l,m,n;((a,b)=>{if(a.length<3||a.length>4)throw Error("GatherBlockQuantized requires 3 or 4 inputs.");let c=bb.normalizeAxis(b.quantizeAxis,a[0].dims.length),d=b.blockSize,e=a[0],f=a[2],g=4===a.length?a[3]:void 0;if(f.dims.length!==e.dims.length||!e.dims.map((a,b)=>b===c?Math.ceil(a/d)===f.dims[b]:a===f.dims[b]).reduce((a,b)=>a&&b,!0))throw Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(g){if(g.dataType!==e.dataType)throw Error("Zero point must have the same data type as the input tensor.");if(g.dims.length!==f.dims.length||!g.dims.map((a,b)=>a===f.dims[b]).reduce((a,b)=>a&&b,!0))throw Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}})(a.inputs,b),a.compute((c=a.inputs,d=b,e=c[0].dims,f=c[1].dims,g=e.length,h=bb.normalizeAxis(d.gatherAxis,g),i=bb.normalizeAxis(d.quantizeAxis,g),(j=e.slice(0)).splice(h,1,...f),k=bb.size(j),l=c[2].dataType,m=22===c[0].dataType,n=[{type:12,data:k},{type:12,data:i},{type:12,data:h},{type:12,data:d.blockSize},...bk(...c.map((a,b)=>a.dims),j)],{name:"GatherBlockQuantized",shaderCache:{hint:`${d.cacheKey};${c.filter((a,b)=>1!==b).map(a=>a.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:c.length},(a,b)=>"rank")},getRunData:()=>({outputs:[{dims:j,dataType:l}],dispatchGroup:{x:Math.ceil(k/64)},programUniforms:n}),getShaderSource:a=>{let b=br("data",c[0].dataType,c[0].dims.length),d=br("inputIndices",c[1].dataType,c[1].dims.length),g=br("scales",c[2].dataType,c[2].dims.length),i=c.length>3?br("zeroPoint",c[3].dataType,c[3].dims.length):void 0,k=bs("output",l,j.length),n=[b,d,g];return i&&n.push(i),`
        ${a.registerUniforms([{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...n,k)}
        ${a.mainStart()}
        let output_indices = ${k.offsetToIndices("global_idx")};
        var indices_indices = ${d.type.indices}(0);
        ${f.length>1?`
          for (var i: u32 = 0; i < ${f.length}; i++) {
            let index = ${k.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${d.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${k.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${b.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${k.indicesGet("output_indices","i")};
          ${b.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${d.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${e[h]};
        }
        ${b.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${j.length}; i++) {
          let index = ${k.indicesGet("output_indices",`i + ${f.length} - 1`)};
          ${b.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${b.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${b.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${m?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${g.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${g.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${g.getByIndices("scale_indices")};
        ${i?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${i.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${i.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${m?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${bj(l)}(quantized_data - zero_point) * scale;
        ${k.setByOffset("global_idx","dequantized_data")};
    }`}}))},dX=a=>a8({blockSize:a.blockSize,gatherAxis:a.gatherAxis,quantizeAxis:a.quantizeAxis})}),fW=O(()=>{fj(),fq(),fp(),fr(),dY=a=>a8({axis:a.axis}),dZ=(a,b)=>{var c,d;let e,f,g,h,i,j,k,l,m,n,o,p,q;(a=>{if(!a||2!==a.length)throw Error("GatherElements requires 2 inputs.");if(a[0].dims.length<1)throw Error("GatherElements requires that the data input be rank >= 1.");if(a[0].dims.length!==a[1].dims.length)throw Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)})(a.inputs),a.compute((c=a.inputs,d=b,e=c[0].dims,f=c[0].dataType,g=e.length,h=c[1].dims,i=c[1].dataType,k=e[j=bb.normalizeAxis(d.axis,g)],l=h.slice(0),m=bb.size(l),n=br("input",f,g),o=br("indicesInput",i,h.length),p=bs("output",f,l.length),(q=[{type:12,data:m},{type:6,data:k},{type:12,data:j}]).push(...bk(e,h,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:c[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:q}),getShaderSource:a=>`
      ${a.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(n,o,p)}
      ${a.mainStart()}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${p.offsetToIndices("global_idx")};

      var idx = ${o.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${n.type.indices}(outputIndices);
      ${n.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${n.getByIndices("inputIndices")};

      ${p.setByOffset("global_idx","value")};
  }`}))}}),fX=O(()=>{fj(),fq(),fr(),d$=a=>({transA:a.transA,transB:a.transB,alpha:a.alpha,beta:a.beta,cacheKey:`${a.transA};${a.transB};${1===a.alpha}`}),d_=(a,b)=>{(a=>{if(!a)throw Error("Input is missing");if(a.length<2||a.length>3)throw Error("Invaid input number.");if(3===a.length&&a[2].dims.length>2)throw Error("Invalid input shape of C");if(a[0].dataType!==a[1].dataType||3===a.length&&a[0].dataType!==a[2].dataType)throw Error("Input types are mismatched")})(a.inputs),a.compute(((a,b)=>{let c=a[0].dims.slice(),d=a[1].dims.slice(),[e,f,g]=bd.getShapeOfGemmResult(c,b.transA,d,b.transB,3===a.length?a[2].dims:void 0),h=[e,f];if(!h)throw Error("Can't use gemm on the given tensors");let i=Math.ceil(f/16),j=Math.ceil(e/16),k=(bb.size(h),[{type:12,data:i},{type:12,data:e},{type:12,data:f},{type:12,data:g},{type:1,data:b.alpha},{type:1,data:b.beta}]),l=["type","type"];return 3===a.length&&(k.push(...bk(a[2].dims)),l.push("rank")),k.push(...bk(h)),{name:"GemmShared",shaderCache:{hint:`${b.cacheKey}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:h,dataType:a[0].dataType}],dispatchGroup:{x:i*j},programUniforms:k}),getShaderSource:c=>{let d=br("a",a[0].dataType,a[0].dims),e=br("b",a[1].dataType,a[1].dims),f=null,g=[d,e];3===a.length&&(f=br("c",a[2].dataType,a[2].dims.length),g.push(f));let i=bs("output",a[0].dataType,h.length);g.push(i);let j="",k="";b.transA&&b.transB?(k=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${d.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${e.type.value}(0);
      }
      `,j="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):b.transA&&!b.transB?(k=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${d.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${e.type.value}(0);
      }
      `,j="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!b.transA&&b.transB?(k=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${d.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${e.type.value}(0);
      }
      `,j="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):b.transA||b.transB||(k=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${d.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${e.type.value}(0);
      }
      `,j="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let l=1===b.alpha?"":"value *= uniforms.alpha;";return`
  ${c.registerUniforms([{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}]).declareVariables(...g)}
  var<workgroup> tile_a: array<array<${d.type.storage}, 16>, 16>;
  var<workgroup> tile_b: array<array<${e.type.storage}, 16>, 16>;
  ${c.mainStart([16,16,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * 16;
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * 16;
    let num_tiles = (uniforms.K - 1) / 16 + 1;
    var k_start = 0u;
    var value = ${i.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${k}
      k_start = k_start + 16;
      workgroupBarrier();

      for (var k: u32 = 0u; k < 16; k++) {
        ${j}
      }
      workgroupBarrier();
    }

    ${l}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${null!=f?`let cOffset = ${f.broadcastedIndicesToOffset("vec2(m, n)",i)}; value += ${i.type.value}(uniforms.beta) * ${f.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`}}})(a.inputs,b))}}),fY=O(()=>{fj(),fq(),fp(),fr(),[d0,d1,d2,d3]=[0,1,2,3],d4=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,d5=(a,b)=>{var c,d;let e,f,g,h,i,j,k;(a=>{if(4!==a[0].dims.length)throw Error("only 4-D tensor is supported.");if(a[0].dims.length!==a[1].dims.length)throw Error("input dimensions must be equal to grid dimensions");if(a[0].dims.length-2!==a[1].dims[a[1].dims.length-1])throw Error(`last dimension of grid must be equal to ${a[0].dims.length-2}`);if(a[0].dims[0]!==a[1].dims[0])throw Error("grid batch size must match input batch size")})(a.inputs),a.compute((c=a.inputs,d=b,e=br("x",c[0].dataType,c[0].dims.length),f=[c[1].dims[0],c[1].dims[1],c[1].dims[2]],g=br("grid",c[1].dataType,f.length,2),h=[c[0].dims[0],c[0].dims[1],c[1].dims[1],c[1].dims[2]],"NHWC"===d.format&&(h=[c[0].dims[0],c[1].dims[1],c[1].dims[2],c[0].dims[3]],[d0,d1,d2,d3]=[0,3,1,2]),i=bs("output",c[0].dataType,h.length),j=e.type.value,k=[{type:12,data:bb.size(h)},...bk(c[0].dims,f,h)],{name:"GridSample",shaderCache:{hint:`${d.cacheKey}`,inputDependencies:["type","type"]},getRunData:a=>{let b=bb.size(h);return{outputs:[{dims:h,dataType:a[0].dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:k}},getShaderSource:a=>{let b,c,f,h,k,l,m,n,o;return`
  ${a.registerUniform("output_size","u32").declareVariables(e,g,i)}
  ${d4}
  ${b=j,`
  fn gs_bicubic_interpolate(p: mat4x4<${b}>, x: f32, y: f32) -> ${b} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${b}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`}
  ${c=d,`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${0===c.alignCorners?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`}
  ${f=d,`
  ${"reflection"===f.paddingMode?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`}
  ${h=e,k=j,l=d,`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${k} {
     var pixel = ${k}(0);
     var indices = vec4<u32>(0);
     indices[${d0}] = batch;
     indices[${d1}] = channel;`+(()=>{switch(l.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${d2}] = u32(r);
            indices[${d3}] = u32(c);
          }
        `;case"border":return`
          indices[${d2}] = u32(clamp(r, 0, H - 1));
          indices[${d3}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${d2}] = gs_reflect(r, border[1], border[3]);
          indices[${d3}] = gs_reflect(c, border[0], border[2]);
        `;default:throw Error(`padding mode ${l.paddingMode} is not supported`)}})()+`
    return ${h.getByIndices("indices")};
  }
`}

  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${d2}]);
      let W_in = i32(uniforms.x_shape[${d3}]);

      ${0===d.alignCorners?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${i.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${d0}], indices[${d2}], indices[${d3}]);
      let nxy = ${g.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${m=i,n=j,o=d,(()=>{switch(o.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${d0}], indices[${d1}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${d0}], indices[${d1}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${d0}], indices[${d1}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${d0}], indices[${d1}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${d0}], indices[${d1}], border);

          let dx2 = ${n}(f32(x2) - x);
          let dx1 = ${n}(x - f32(x1));
          let dy2 = ${n}(f32(y2) - y);
          let dy1 = ${n}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${n}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${d0}], indices[${d1}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw Error(`mode ${o.mode} is not supported`)}})()+`${m.setByOffset("global_idx","result")}`}
  }`}}))},d6=a=>a8({alignCorners:a.align_corners,mode:a.mode,paddingMode:a.padding_mode,format:a.format})}),fZ=O(()=>{fj(),fq(),fp(),fn(),fw(),fr(),fs(),d7=(a,b)=>a.length>b&&a[b].dims.length>0?a[b]:void 0,d8=a=>a8({...a}),d9=a8({perm:[0,2,1,3]}),ea=(a,b,c,d,e,f,g,h)=>{var i,j,k,l,m,n,o;let p,q,r,s=f;if(!(g&&bb.size(g.dims)>0))return 3===f.dims.length&&(s=f.reshape([b,d,c,e])),1===c||1===d?s:a.compute(by(s,d9.perm),{inputs:[s],outputs:[-1]})[0];if(1===d)throw Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return s=(i=a,j=f,k=g,l=b,m=d,n=c*e,o=h,p=[l,m,n],r=[{type:12,data:q=bb.size(p)},{type:12,data:o},{type:12,data:n}],s=i.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:p,dataType:j.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(q/64)},programUniforms:r}),getShaderSource:a=>{let b=bs("qkv_with_bias",j.dataType,p),c=br("qkv",j.dataType,p),d=br("bias",k.dataType,p);return`
  ${a.registerUniforms([{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}]).declareVariables(c,d,b)}
  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`}},{inputs:[j,k],outputs:[-1]})[0]).reshape([b,d,c,e]),1===c||1===d?s:a.compute(by(s,d9.perm),{inputs:[s],outputs:[-1]})[0]},eb=(a,b)=>{let c=((a,b)=>{let c,d=a[0],e=d7(a,1),f=d7(a,2),g=d7(a,3),h=d7(a,4),i=d7(a,5),j=d7(a,6),k=d7(a,7);if(3!==d.dims.length&&5!==d.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let l=d.dims[0],m=d.dims[1],n=3===d.dims.length?d.dims[2]:b.numHeads*d.dims[4],o=m,p=0,q=0,r=Math.floor(n/b.numHeads);if(j&&k&&bb.size(j.dims)&&bb.size(k.dims)){if(4!==j.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(j.dims[0]!==l||j.dims[1]!==b.numHeads||j.dims[3]!==r)throw Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(k.dims[0]!==l||k.dims[1]!==b.numHeads||k.dims[3]!==r)throw Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(j.dims[2]!==k.dims[2])throw Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(4!==k.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');p=j.dims[2],q=j.dims[2]}else if(j&&bb.size(j.dims)||k&&bb.size(k.dims))throw Error('Input "past_key" and "past_value" shall be both present or both absent');if(e&&bb.size(e.dims)>0){if(3!==d.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(e.dims.length<3||e.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(d.dims[0]!==e.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===e.dims.length){if(e.dims[2]!==d.dims[2])throw Error('Input "query" and "key" shall have same dim 2 (hidden_size)');c=2,o=e.dims[1]}else if(5===e.dims.length){if(e.dims[2]!==b.numHeads||2!==e.dims[3]||e.dims[4]!==r)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(f)throw Error('Expect "value" be none when "key" has packed kv format.');c=5,o=e.dims[1]}else{if(e.dims[1]!==b.numHeads||e.dims[3]!==r)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');c=0,o=e.dims[2]}}else{if(5!==d.dims.length)throw Error('Input "query" is expected to have 5 dimensions when key is empty');if(d.dims[2]!==b.numHeads||3!==d.dims[3])throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');c=3}if(g&&bb.size(g.dims)>0){if(1!==g.dims.length)throw Error('Input "bias" is expected to have 1 dimension');if(e&&5===e.dims.length&&2===e.dims[3])throw Error("bias is not allowed for packed kv.")}let s=p+o,t=0;if(h&&bb.size(h.dims)>0){t=8;let a=h.dims;throw 1===a.length?a[0]===l?t=1:a[0]===3*l+2&&(t=3):2===a.length&&a[0]===l&&a[1]===s&&(t=5),8===t?Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):Error("Mask not supported")}let u=!1,v=n;if(f&&bb.size(f.dims)>0){if(3!==f.dims.length&&4!==f.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(d.dims[0]!==f.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===f.dims.length){if(o!==f.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');v=f.dims[2]}else{if(o!==f.dims[2])throw Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');v=f.dims[1]*f.dims[3],u=!0}}if(h&&bb.size(h.dims)>0)throw Error("Key padding mask is not supported");if(i&&bb.size(i.dims)>0){if(4!==i.dims.length)throw Error('Input "attention_bias" is expected to have 4 dimensions');if(i.dims[0]!==l||i.dims[1]!==b.numHeads||i.dims[2]!==m||i.dims[3]!==s)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:m,pastSequenceLength:p,kvSequenceLength:o,totalSequenceLength:s,maxSequenceLength:q,inputHiddenSize:0,hiddenSize:n,vHiddenSize:v,headSize:r,vHeadSize:Math.floor(v/b.numHeads),numHeads:b.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:b.maskFilterValue,maskType:t,scale:b.scale,broadcastResPosBias:!1,passPastInKv:u,qkvFormat:c}})(a.inputs,b),d=a.inputs[0],e=d7(a.inputs,1),f=d7(a.inputs,2),g=d7(a.inputs,3),h=d7(a.inputs,4),i=d7(a.inputs,5),j=d7(a.inputs,6),k=d7(a.inputs,7);if(5===d.dims.length)throw Error("Packed QKV is not implemented");if(e?.dims.length===5)throw Error("Packed KV is not implemented");let l=e&&f&&4===e.dims.length&&4===f.dims.length,m=ea(a,c.batchSize,c.numHeads,c.sequenceLength,c.headSize,d,g,0);if(l)return b9(a,m,e,f,h,void 0,j,k,i,c);if(!e||!f)throw Error("key and value must be provided");let n=ea(a,c.batchSize,c.numHeads,c.kvSequenceLength,c.headSize,e,g,c.hiddenSize),o=ea(a,c.batchSize,c.numHeads,c.kvSequenceLength,c.vHeadSize,f,g,2*c.hiddenSize);b9(a,m,n,o,h,void 0,j,k,i,c)}}),f$=O(()=>{fj(),fq(),fp(),fr(),ec=(a,b)=>{let c=a[0].dims,d=bb.size(c),e=a[0].dataType,f=bb.normalizeAxis(b.axis,c.length),g=Array(b.numOutputs),h=br("input",e,c.length),i=Array(b.numOutputs),j=[],k=[],l=0,m=[{type:12,data:d}];for(let d=0;d<b.numOutputs;d++){l+=b.splitSizes[d],i[d]=l;let h=c.slice();h[f]=b.splitSizes[d],k.push(h),g[d]=bs(`output${d}`,e,h.length),j.push({dims:k[d],dataType:a[0].dataType})}return m.push({type:12,data:i},...bk(c,...k)),{name:"Split",shaderCache:{hint:b.cacheKey,inputDependencies:["rank"]},getShaderSource:a=>{let b;return`
  ${a.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",i.length).declareVariables(h,...g)}
  ${b=i.length,`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${b}u; i += 1u ) {
    if (index < ${bp("uniforms.size_in_split_axis","i",b)}) {
        return i;
    }
    }
    return ${b}u;
}`}
  ${(a=>{let b=a.length,c=[];for(let d=0;d<b;++d){let e=a[d].setByIndices("indices","input[global_idx]");1===b?c.push(e):0===d?c.push(`if (output_number == ${d}u) { ${e} }`):d===b-1?c.push(`else { ${e} }`):c.push(`else if (output_number == ${d}) { ${e} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${a[0].type.indices}, global_idx: u32) {
        ${c.join(`
`)}
      }`})(g)}

  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${h.offsetToIndices("global_idx")};
    var index = ${h.indicesGet("indices",f)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${bp("uniforms.size_in_split_axis","output_number - 1u",i.length)};
      ${h.indicesSet("indices",f,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`},getRunData:()=>({outputs:j,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:m})}},ed=(a,b)=>{let c,d;var e,f,g=a.inputs;if(!g||g.length<1)throw Error("too few inputs");let h=1===a.inputs.length?b:(e=a.inputs,c=[],d=(f=b).numOutputs,e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(a=>c.push(Number(a))),d=c.length),a8({numOutputs:d,axis:f.axis,splitSizes:c}));a.compute(ec(a.inputs,h),{inputs:[0]})},ee=a=>{let b=a.axis,c=a.splitSizes,d=a.numOutputs<0?c.length:a.numOutputs;if(d!==c.length)throw Error("numOutputs and splitSizes lengh must be equal");return a8({axis:b,numOutputs:d,splitSizes:c})}}),f_=O(()=>{fp(),fw(),fZ(),f$(),fs(),ef=a8({perm:[0,2,1,3]}),eg=(a,b,c)=>{let d=b,e=c.kvNumHeads;return 3===b.dims.length&&0!==c.kvSequenceLength&&(d=b.reshape([c.batchSize,c.kvSequenceLength,e,c.headSize]),d=a.compute(by(d,ef.perm),{inputs:[d],outputs:[-1]})[0]),d},eh=(a,b)=>{let c=((a,b)=>{if(b.doRotary)throw Error("GroupQuerryAttention do_rotary attribute is not supported");if(b.doRotary&&a.length<=7)throw Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let c=a[0],d=a[1],e=a[2],f=a[3],g=a[4];if(-1!==b.localWindowSize)throw Error("Local attention is not supported");if(0!==b.softcap)throw Error("Softcap is not supported");if(0!==b.rotaryInterleaved)throw Error("Rotary interleaved is not supported");if(b.smoothSoftmax)throw Error("Smooth softmax is not supported");if(3!==c.dims.length&&5!==c.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let h=c.dims[0],i=c.dims[1],j=3===c.dims.length?c.dims[2]:b.numHeads*c.dims[4],k=i,l=0,m=!d||0===d.dims.length,n=Math.floor(m?j/(b.numHeads+2*b.kvNumHeads):j/b.numHeads);m&&(j=n*b.numHeads);let o=f&&0!==f.dims.length,p=g&&0!==g.dims.length;if(o&&4===f.dims.length&&f.dims[0]===h&&f.dims[1]!==b.kvNumHeads&&f.dims[2]===b.kvNumHeads&&f.dims[3]===n)throw Error("BSNH pastKey/pastValue is not supported");if(o&&p){if(4!==f.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(4!==g.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');l=f.dims[2]}else if(o||p)throw Error('Input "past_key" and "past_value" shall be both present or both absent');let q=1;if(d&&d.dims.length>0){if(3!==c.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(d.dims.length<3||d.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(c.dims[0]!==d.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===d.dims.length){if(c.dims[2]%d.dims[2]!=0)throw Error('Dimension 2 of "query" should be a multiple of "key"');k=d.dims[1]}else if(5===d.dims.length){if(d.dims[2]!==b.numHeads||2!==d.dims[3]||d.dims[4]!==n)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(e)throw Error('Expect "value" be none when "key" has packed kv format.');k=d.dims[1]}else{if(d.dims[1]!==b.numHeads||d.dims[3]!==n)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');k=d.dims[2]}}else{if(3!==c.dims.length&&5!==c.dims.length)throw Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(5===c.dims.length&&(c.dims[2]!==b.numHeads||3!==c.dims[3]))throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');q=3}let r=!1,s=b.kvNumHeads?n*b.kvNumHeads:j;if(e&&e.dims.length>0){if(3!==e.dims.length&&4!==e.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(c.dims[0]!==e.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===e.dims.length){if(k!==e.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');s=e.dims[2]}else{if(k!==e.dims[2])throw Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');s=e.dims[1]*e.dims[3],r=!0}}let t=a.length>4?a[5]:void 0;if(t&&1!==t.dims.length&&t.dims[0]!==h)throw Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:h,sequenceLength:i,pastSequenceLength:l,kvSequenceLength:k,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:j,vHiddenSize:s,headSize:n,vHeadSize:Math.floor(s/b.kvNumHeads),numHeads:b.numHeads,kvNumHeads:b.kvNumHeads,nReps:b.numHeads/b.kvNumHeads,pastPresentShareBuffer:!1,maskType:0,scale:b.scale,broadcastResPosBias:!1,passPastInKv:r,qkvFormat:q}})(a.inputs,b);if(5===a.inputs[0].dims.length)throw Error("Packed QKV is not implemented");if(a.inputs[1]?.dims.length===5)throw Error("Packed KV is not implemented");let d=a.inputs[0],e=a.inputs[1]&&a.inputs[1].dims.length>0?a.inputs[1]:void 0,f=a.inputs[2]&&a.inputs[2].dims.length>0?a.inputs[2]:void 0,g=a.inputs[3]&&0!==a.inputs[3].dims.length?a.inputs[3]:void 0,h=a.inputs[4]&&0!==a.inputs[4].dims.length?a.inputs[4]:void 0,i=a.inputs.length>4?a.inputs[5]:void 0,j=a.inputs.length>5?a.inputs[6]:void 0,k=c.kvNumHeads?c.kvNumHeads:c.numHeads,l=a8({axis:2,numOutputs:3,splitSizes:[c.numHeads*c.headSize,k*c.headSize,k*c.headSize]}),[m,n,o]=e||f?[d,e,f]:a.compute(ec([d],l),{inputs:[d],outputs:[-1,-1,-1]}),p=ea(a,c.batchSize,c.numHeads,c.sequenceLength,c.headSize,m,void 0,0);b9(a,p,eg(a,n,c),eg(a,o,c),void 0,void 0,g,h,void 0,c,i,j)}}),f0=O(()=>{fj(),fq(),fs(),fr(),ei=(a,b,c,d,e,f,g,h)=>{let i=bl(f),j=1===i?"f32":`vec${i}f`,k=1===i?"vec2f":`mat2x${i}f`,l=e*g,m=64;1===l&&(m=256);let n=[e,g,f/i],o=[e,g,2],p=[];return p.push(...bk(n,o)),a.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${i};${h};${m}`,inputDependencies:["rank","type","type"]},getRunData:()=>({outputs:[{dims:o,dataType:1}],dispatchGroup:{x:l},programUniforms:p}),getShaderSource:a=>{let e=br("x",b.dataType,3,i),f=[e,br("scale",c.dataType,c.dims),br("bias",d.dataType,d.dims),bs("output",1,3,2)];return`
  var<workgroup> workgroup_shared : array<${k}, ${m}>;
  const workgroup_size = ${m}u;
  ${a.declareVariables(...f)}
  ${a.mainStart(m)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${j}(0);
    var squared_sum = ${j}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${j}(${e.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${k}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${bo("workgroup_shared[0][0]",i)} / f32(hight * ${i});
      let squared_sum_final = ${bo("workgroup_shared[0][1]",i)} / f32(hight * ${i});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${h}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`}},{inputs:[b,c,d],outputs:[-1]})[0]},ej=(a,b)=>{var c,d,e;let f,g,h,i,j,k,l,m,n;"NHWC"===b.format?((a,b,c)=>{let d=b[0].dims,e=d[0],f=d[d.length-1],g=bb.sizeFromDimension(d,1)/f,h=bl(f),i=bb.size(d)/h,j=[{type:12,data:g},{type:12,data:Math.floor(f/h)}],k=!1,l=[0,d.length-1];for(let a=0;a<d.length-2;a++)k=k||1!==d[a+1],l.push(a+1);let m=(k=k&&1!==d[d.length-1])?a.compute(by(a.inputs[0],l),{inputs:[a.inputs[0]],outputs:[-1]})[0]:a.inputs[0].reshape(Array.from({length:d.length},(a,b)=>d[l[b]])),n=ei(a,m,b[1],b[2],e,g,f,c.epsilon);a.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${h}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:d,dataType:b[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:j}),getShaderSource:a=>{let c=bi(b[0].dataType),e=1===h?"vec2f":`mat${h}x2f`,f=a=>{let b=0===a?"x":"y",d=1===h?"f32":`vec${h}f`;switch(h){case 1:return`${c}(${d}(scale.${b}))`;case 2:return`vec2<${c}>(${d}(scale[0].${b}, scale[1].${b}))`;case 4:return`vec4<${c}>(${d}(scale[0].${b}, scale[1].${b}, scale[2].${b}, scale[3].${b}))`;default:throw Error(`Not supported compoents ${h}`)}},g=br("input",b[0].dataType,b[0].dims,h),i=bs("output",b[0].dataType,d,h);return`
  @group(0) @binding(0) var<storage, read> input : array<${g.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${e}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${i.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${a.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${f(0)}, ${f(1)});
  }`}},{inputs:[b[0],n]})})(a,a.inputs,b):(c=a,d=a.inputs,e=b,g=(f=d[0].dims)[0],h=f[1],i=bb.sizeFromDimension(f,2),j=bl(i),k=bb.size(f)/j,l=ei(c,d[0],d[1],d[2],g,i,h,e.epsilon),m=[g,h,i/j],n=[g,h],c.compute({name:"InstanceNormalization",shaderCache:{hint:`${j}`,inputDependencies:["type","none"]},getRunData:()=>({outputs:[{dims:f,dataType:d[0].dataType}],dispatchGroup:{x:Math.ceil(k/64)},programUniforms:[{type:12,data:k},...bk(m,n,m)]}),getShaderSource:a=>{let b=br("x",d[0].dataType,m.length,j),c=br("scale_shift",1,n.length,2),e=bs("output",d[0].dataType,m.length,j),f=[b,c,e];return`
  ${a.registerUniform("output_size","u32").declareVariables(...f)}
  ${a.mainStart()}
  ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${e.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${c.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${b.getByOffset("global_idx")} * ${e.type.value}(scale_shift.x) + ${e.type.value}(scale_shift.y);
      ${e.setByOffset("global_idx","value")};
  }`}},{inputs:[d[0],l]}))}}),f1=O(()=>{fj(),fq(),fr(),ek=(a,b)=>{(a=>{if(!a||a.length<2)throw Error("layerNorm requires at least 2 inputs.")})(a.inputs),a.compute(((a,b,c)=>{let d=b.simplified,e=a[0].dims,f=a[1],g=!d&&a[2],h=bb.normalizeAxis(b.axis,e.length),i=bb.sizeToDimension(e,h),j=bb.sizeFromDimension(e,h),k=bb.size(f.dims),l=g?bb.size(g.dims):0;if(k!==j||g&&l!==j)throw Error(`Size of X.shape()[axis:] == ${j}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${k} and bias size of ${l}`);let m=[];for(let a=0;a<e.length;++a)a<h?m.push(e[a]):m.push(1);let n=bl(j),o=["type","type"],p=[{type:12,data:i},{type:1,data:j},{type:12,data:Math.floor(j/n)},{type:1,data:b.epsilon}];g&&o.push("type");let q=c>1,r=c>2,s=[{dims:e,dataType:a[0].dataType}];return q&&s.push({dims:m,dataType:1}),r&&s.push({dims:m,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${n};${c};${d}`,inputDependencies:o},getRunData:()=>({outputs:s,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:p}),getShaderSource:b=>{let c=bi(a[0].dataType),h=[br("x",a[0].dataType,a[0].dims,n),br("scale",f.dataType,f.dims,n)];return g&&h.push(br("bias",g.dataType,g.dims,n)),h.push(bs("output",a[0].dataType,e,n)),q&&h.push(bs("mean_data_output",1,m)),r&&h.push(bs("inv_std_output",1,m)),`
  ${b.registerUniforms([{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...h)}
  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${bm("f32",n)};
    var mean_square_vector = ${bm("f32",n)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${bn(c,n,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${bo("mean_vector",n)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${bo("mean_square_vector",n)} / uniforms.norm_size ${d?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${bn(c,n,"x[j + offset]")};
      let f32scale = ${bn(c,n,"scale[j]")};
      output[j + offset] = ${h[0].type.value}((f32input ${d?"":"- mean"}) * inv_std_dev * f32scale
        ${g?`+ ${bn(c,n,"bias[j]")}`:""}
      );
    }

    ${q?"mean_data_output[global_idx] = mean":""};
    ${r?"inv_std_output[global_idx] = inv_std_dev":""};
  }`}}})(a.inputs,b,a.outputCount))}}),f2=O(()=>{fq(),fG(),fH(),el=a=>{var b=a.inputs;if(!b||2!==b.length)throw Error("MatMul requires 2 inputs.");if(b[0].dims[b[0].dims.length-1]!==b[1].dims[b[1].dims.length-2])throw Error("shared dimension does not match.");let c=ba.calcShape(a.inputs[0].dims,a.inputs[1].dims,!0);if(!c)throw Error("Can't use matmul on the given tensors");let d=c[c.length-1],e=a.inputs[0].dims[a.inputs[0].dims.length-1];if(d<8&&e<8)a.compute(dd(a.inputs,{activation:""},c));else{let b=c[c.length-2],f=bb.size(a.inputs[0].dims.slice(0,-2)),g=bb.size(a.inputs[1].dims.slice(0,-2));if(1!==f&&1===b&&1===g){let b=a.inputs[0].reshape([1,f,e]),g=a.inputs[1].reshape([1,e,d]),h=[1,f,d],i=[b,g];a.compute(dh(i,{activation:""},c,h),{inputs:i})}else a.compute(dh(a.inputs,{activation:""},c))}}}),f3=O(()=>{fj(),fq(),fp(),fr(),em=(a,b)=>{var c,d,e,f;let g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U;((a,b)=>{if(a.length<3||a.length>4)throw Error("MatMulNBits requires 3 or 4 inputs");let c=a[0],d=c.dims.length;if(c.dims[d-1]!==b.k)throw Error("The last dim of input shape does not match the k value");let e=Math.floor((b.k+b.blockSize-1)/b.blockSize),f=b.blockSize/8*b.bits,g=a[1];if(!bb.areEqual(g.dims,[b.n,e,f]))throw Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let h=a[2].dims;if(bb.size(h)!==b.n*e)throw Error("scales input size error.");if(4===a.length){let c=a[3].dims,d=b.bits>4?b.n*e:b.n*Math.floor((e+1)/2);if(bb.size(c)!==d)throw Error("zeroPoints input size error.")}})(a.inputs,b),32===b.blockSize&&a.adapterInfo.isVendor("intel")&&a.adapterInfo.isArchitecture("gen-12lp")?a.compute((c=a.inputs,d=b,h=(g=c[0].dims).length,i=g[h-2],j=d.k,k=d.n,l=g.slice(0,h-2),m=bb.size(l),n=c[1].dims[2]/4,o=c[0].dataType,p=bl(d.k),q=bl(n),r=l.concat([i,k]),v=(u=(t=128/(s=k%8==0?8:k%4==0?4:1))*q*8)/p,w=u/d.blockSize,x=bb.size(r)/s,y=[],z=[m,i,j/p],(A=bb.convertShape(c[1].dims).slice()).splice(-1,1,n/q),y.push(...bk(z)),y.push(...bk(A)),y.push(...bk(c[2].dims)),4===c.length&&y.push(...bk(bb.convertShape(c[3].dims))),B=[m,i,k],y.push(...bk(B)),{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${d.blockSize};${p};${q};${t};${s}`,inputDependencies:Array(c.length).fill("rank")},getRunData:()=>({outputs:[{dims:r,dataType:o}],dispatchGroup:{x:x},programUniforms:y}),getShaderSource:a=>{let b=z.length,e=br("a",c[0].dataType,b,p),f=br("b",12,A.length,q),g=br("scales",c[2].dataType,c[2].dims.length),h=[e,f,g],i=4===c.length?br("zero_points",12,c[3].dims.length):void 0;i&&h.push(i);let j=B.length,k=bs("output",c[0].dataType,j),l=bi(c[0].dataType);return`
        var<workgroup> sub_a: array<${e.type.value}, ${v}>;
        var<workgroup> inter_results: array<array<${k.type.value}, ${t}>, ${s}>;
        ${a.declareVariables(...h,k)}
        ${a.mainStart([t,s,1])}
          let output_indices = ${k.offsetToIndices(`workgroup_index * ${s}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${w} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${v};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${v}; a_offset += 128)
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${e.getByIndices(`${e.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${e.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${w} + local_id.x;
            ${i?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${i.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${l}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${l}(8);`}
            let scale = ${g.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${f.getByIndices(`${f.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${d.blockSize/p};
            for (var i: u32 = 0; i < ${q}; i++) {
              ${(()=>{switch(p){case 1:return`
          let a_data0 = vec4<${l}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${l}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${l}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${l}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw Error(`${p}-component is not supported.`)}})()}
              let b_value = ${1===q?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${l}>(${Array.from({length:4},(a,b)=>`${l}(b_value_lower[${b}]), ${l}(b_value_upper[${b}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${l}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(a,b)=>`dot(a_data${b}, b_dequantized_values[${b}])`).join(" + ")};
              word_offset += ${8/p};
            }
            workgroupBarrier();
          }

          if (local_idx < ${s}) {
            var output_value: ${k.type.value} = ${k.type.value}(0);
            for (var b = 0u; b < ${t}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${k.setByIndices(`${k.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`}})):a.compute((e=a.inputs,f=b,D=(C=e[0].dims).length,E=C[D-2],F=f.k,G=f.n,H=C.slice(0,D-2),I=bb.size(H),J=e[1].dims[2]/4,K=e[0].dataType,L=bl(f.k),M=bl(J),N=bl(G),O=H.concat([E,G]),P=E>1&&G/N%2==0?2:1,Q=bb.size(O)/N/P,R=[],S=[I,E,F/L],(T=bb.convertShape(e[1].dims).slice()).splice(-1,1,J/M),R.push(...bk(S)),R.push(...bk(T)),R.push(...bk(e[2].dims)),4===e.length&&R.push(...bk(bb.convertShape(e[3].dims))),U=[I,E,G/N],R.push(...bk(U)),{name:"MatMulNBits",shaderCache:{hint:`${f.blockSize};${f.bits};${L};${M};${N};${P};64`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:O,dataType:K}],dispatchGroup:{x:Q},programUniforms:R}),getShaderSource:a=>{let b=S.length,c=br("a",e[0].dataType,b,L),d=br("b",12,T.length,M),g=br("scales",e[2].dataType,e[2].dims.length),h=[c,d,g],i=4===e.length?br("zero_points",12,e[3].dims.length):void 0;i&&h.push(i);let j=U.length,k=bs("output",e[0].dataType,j,N),l=bi(e[0].dataType),m=(()=>{switch(L){case 1:return`array<${l}, 8>`;case 2:return`mat4x2<${l}>`;case 4:return`mat2x4<${l}>`;default:throw Error(`${L}-component is not supported.`)}})();return`
        var<workgroup> workgroup_shared: array<${k.type.value}, ${64*P}>;
        ${a.declareVariables(...h,k)}
        ${a.mainStart([64,1,1])}
          let output_indices = ${k.offsetToIndices(`(global_idx / 64) * ${P}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += 64) {
            //process one block
            var word_offset: u32 = block * ${f.blockSize/L};
            ${(()=>{let a=`
            var col_index = col * ${N};
            ${i?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${l}(8);`}
            `;for(let b=0;b<N*P;b++)a+=`
            let scale${b} = ${g.getByOffset("col_index * nBlocksPerCol + block")};
            ${i?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${i.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${b} = ${l}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return a})()}
            for (var word: u32 = 0; word < ${J}; word += ${M}) {
              ${(()=>{let a=`col_index = col * ${N};`;for(let b=0;b<N*P;b++)a+=`
            let b${b}_data = ${d.getByIndices(`${d.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return a+`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${m};
            var b_dequantized_values: ${m};`})()}
              for (var i: u32 = 0; i < ${M}; i++) {
                ${(()=>{let a=`
          // reuse a data
            var input_offset = ${c.indicesToOffset(`${c.type.indices}(batch, row, word_offset)`)};
            var a_data: ${m};
            for (var j: u32 = 0; j < ${8/L}; j++) {
              a_data[j] = ${c.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let b=0;b<N*P;b++)a+=`
            b_value = ${1===M?`b${b}_data`:`b${b}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${m}(${Array.from({length:4},(a,b)=>`${l}(b_value_lower[${b}]), ${l}(b_value_upper[${b}])`).join(", ")});
            b_dequantized_values = ${1===L?`${m}(${Array.from({length:8},(a,c)=>`(b_quantized_values[${c}] - ${i?`zero_point${b}`:"zero_point"}) * scale${b}`).join(", ")});`:`(b_quantized_values - ${m}(${Array(8).fill(`${i?`zero_point${b}`:"zero_point"}`).join(",")})) * scale${b};`};
            workgroup_shared[local_id.x * ${P} + ${Math.floor(b/N)}]${N>1?`[${b%N}]`:""} += ${Array.from({length:8/L},(a,b)=>`${1===L?`a_data[${b}] * b_dequantized_values[${b}]`:`dot(a_data[${b}], b_dequantized_values[${b}])`}`).join(" + ")};
          `;return a})()}
                word_offset += ${8/L};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${P}) {
            var output_value: ${k.type.value} = ${k.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < 64u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${P};
            }
            ${k.setByIndices(`${k.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`}}))},en=a=>a8(a)}),f4=O(()=>{fj(),fq(),fr(),eo=(a,b)=>{let c,d,e,f;var g,h,i=a.inputs;if(!i||i.length<1)throw Error("Too few inputs");if(1!==i[0].dataType&&10!==i[0].dataType)throw Error("Input type must be float or float16.");if(i.length>=2){let a=2*i[0].dims.length===i[1].dims[0];if(4===i.length&&(a=2*i[3].dims[0]===i[1].dims[0]),!a)throw Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}let j=((a,b)=>{if(!(a.length>1))return b;{let c=a[1].getBigInt64Array(),d=a.length>=3&&a[2].data?10===a[2].dataType?a[2].getUint16Array()[0]:a[2].getFloat32Array()[0]:0,e=a[0].dims.length,f=new Int32Array(2*e).fill(0);if(a.length>=4){let b=a[3].getBigInt64Array();for(let a=0;a<b.length;a++)f[Number(b[a])]=Number(c[a]),f[Number(b[a])+e]=Number(c[a+b.length])}else c.forEach((a,b)=>f[Number(b)]=Number(a));let g=[];return f.forEach(a=>g.push(a)),{mode:b.mode,value:d,pads:g}}})(a.inputs,b);a.compute((g=a.inputs,h=j,c=bb.padShape(g[0].dims.slice(),h.pads),d=g[0].dims,e=[{type:12,data:bb.size(c)},{type:6,data:h.pads}],f=g.length>=3&&g[2].data,0===h.mode&&e.push({type:f?g[2].dataType:1,data:h.value}),e.push(...bk(g[0].dims,c)),{name:"Pad",shaderCache:{hint:`${h.mode}${f}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:g[0].dataType}],dispatchGroup:{x:Math.ceil(bb.size(c)/64)},programUniforms:e}),getShaderSource:a=>{let b=bs("output",g[0].dataType,c.length),e=br("x",g[0].dataType,d.length),i=e.type.value,j=((a,b,c)=>{switch(c.mode){case 0:var d=a,e=b,f=c.pads.length;let g="";for(let a=e-1;a>=0;--a)g+=`
            k = i32(${d.indicesGet("indices",a)}) - ${bp("uniforms.pads",a,f)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${bp("uniforms.x_shape",a,e)})) {
              break;
            }
            offset += k * i32(${bp("uniforms.x_strides",a,e)});
        `;return`
          value = ${d.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${g}
            value = x[offset];
          }
      `;case 1:var h=a,i=b,j=c.pads.length;let k="";for(let a=i-1;a>=0;--a)k+=`
                k = i32(${h.indicesGet("indices",a)}) - ${bp("uniforms.pads",a,j)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${bp("uniforms.x_shape",a,i)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${bp("uniforms.x_shape",a,i)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${bp("uniforms.x_strides",a,i)});
            `;return`
              var offset = 0;
              var k = 0;
              ${k}
              value = x[offset];
          `;case 2:var l=a,m=b,n=c.pads.length;let o="";for(let a=m-1;a>=0;--a)o+=`
                k = i32(${l.indicesGet("indices",a)}) - ${bp("uniforms.pads",a,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${bp("uniforms.x_shape",a,m)})) {
                  k = i32(${bp("uniforms.x_shape",a,m)}) - 1;
                }
                offset += k * i32(${bp("uniforms.x_strides",a,m)});
            `;return`
              var offset = 0;
              var k = 0;
              ${o}
              value = x[offset];
          `;case 3:var p=a,q=b,r=c.pads.length;let s="";for(let a=q-1;a>=0;--a)s+=`
                k = i32(${p.indicesGet("indices",a)}) - ${bp("uniforms.pads",a,r)};
                if (k < 0)  {
                  k += i32(${bp("uniforms.x_shape",a,q)}]);
                }
                if (k >= i32(${bp("uniforms.x_shape",a,q)})) {
                  k -= i32(${bp("uniforms.x_shape",a,q)});
                }
                offset += k * i32(${bp("uniforms.x_strides",a,q)});
            `;return`
              var offset = 0;
              var k = 0;
              ${s}
              value = x[offset];
          `;default:throw Error("Invalid mode")}})(b,d.length,h),k=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:h.pads.length}];return 0===h.mode&&k.push({name:"constant_value",type:f?i:"f32"}),`
            ${a.registerUniforms(k).declareVariables(e,b)}
            ${a.mainStart()}
            ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${b.offsetToIndices("global_idx")};

            var value = ${i}(0);
            ${j}
            output[global_idx] = value;
        }`}}),{inputs:[0]})}}),f5=O(()=>{ai(),fj(),fq(),fr(),ep=a=>{if(m.webgpu.validateInputContent&&(!a||1!==a.length))throw Error("Pool ops requires 1 input.")},eq=(a,b,c)=>{let d="NHWC"===b.format,e=a.dims.slice();d&&e.splice(1,0,e.pop());let f=Object.hasOwnProperty.call(b,"dilations"),g=b.kernelShape.slice(),h=b.strides.slice(),i=f?b.dilations.slice():[],j=b.pads.slice();bc.adjustPoolAttributes(c,e,g,h,i,j);let k=bc.computePoolOutputShape(c,e,h,i,g,j,b.autoPad),l=Object.assign({},b);f?Object.assign(l,{kernelShape:g,strides:h,pads:j,dilations:i,cacheKey:b.cacheKey}):Object.assign(l,{kernelShape:g,strides:h,pads:j,cacheKey:b.cacheKey});let m=k.slice();return m.push(m.splice(1,1)[0]),[l,d?m:k]},er=(a,b)=>{let c="NHWC"===b.format,d=[{type:12,data:bb.size(a)},{type:12,data:bb.size(b.kernelShape)}],e=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(b.kernelShape.length<=2){let a=b.kernelShape[b.kernelShape.length-1],c=b.strides[b.strides.length-1],f=b.pads[b.pads.length/2-1],g=b.pads[b.pads.length-1],h=!!(f+g);d.push({type:12,data:a},{type:12,data:c},{type:12,data:f},{type:12,data:g}),e.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let i=!1;if(2===b.kernelShape.length){let a=b.kernelShape[b.kernelShape.length-2],c=b.strides[b.strides.length-2],f=b.pads[b.pads.length/2-2],g=b.pads[b.pads.length-2];i=!!(f+g),d.push({type:12,data:a},{type:12,data:c},{type:12,data:f},{type:12,data:g}),e.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[d,e,!0,h,i]}{if(c)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let a=bb.computeStrides(b.kernelShape);return d.push({type:12,data:a},{type:12,data:b.pads},{type:12,data:b.strides}),e.push({name:"kernelStrides",type:"u32",length:a.length},{name:"pads",type:"u32",length:b.pads.length},{name:"strides",type:"u32",length:b.strides.length}),[d,e,!!b.pads.reduce((a,b)=>a+b),!1,!1]}},es=(a,b,c,d,e,f,g,h,i,j,k,l)=>{let m="NHWC"===e.format,n=b.type.value,o=bs("output",b.type.tensor,d);if(e.kernelShape.length<=2){let d="",j="",p="",q=c-(m?2:1);if(d=k?`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${q}] = indices[${q}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${q}] < 0 || xIndices[${q}]
                      >= uniforms.x_shape[${q}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${b.indicesToOffset("xIndices")}];
                  ${f}
                }`:`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${q}] = indices[${q}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${b.indicesToOffset("xIndices")}];
                  ${f}
                }`,2===e.kernelShape.length){let a=c-(m?3:2);j=l?`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${a}] = indices[${a}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${a}] < 0 || xIndices[${a}] >= uniforms.x_shape[${a}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${a}] = indices[${a}] * uniforms.sh - uniforms.phStart + j;
                `,p=`
              }
            `}return`
            ${a.registerUniforms(i).declareVariables(b,o)}

            ${a.mainStart()}
              ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${o.offsetToIndices("global_idx")};
              var xIndices = ${o.offsetToIndices("global_idx")};

              var value = ${n}(${h});
              var pad = 0;
              ${j}
              ${d}
              ${p}
              ${g}

              output[global_idx] = value;
            }`}{if(m)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let d=e.kernelShape.length,k=e.pads.length,l="";return l=j?`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${b.indicesToOffset("xIndices")}];
                ${f}
              }`:`
              }
              let x_val = x[${b.indicesToOffset("xIndices")}];
              ${f}
            `,`
            ${a.registerUniforms(i).declareVariables(b,o)}

            ${a.mainStart()}
              ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${o.offsetToIndices("global_idx")};
              var xIndices = ${o.offsetToIndices("global_idx")};

              var offsets: array<u32, ${d}>;

              var value = ${n}(${h});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${d-1}u; j++) {
                  offsets[j] = offset / ${bp("uniforms.kernelStrides","j",d)};
                  offset -= offsets[j] * ${bp("uniforms.kernelStrides","j",d)};
                }
                offsets[${d-1}] = offset;

                isPad = false;
                for (var j = ${c-d}u; j < ${c}u; j++) {
                  xIndices[j] = indices[j] * ${bp("uniforms.strides",`j - ${c-d}u`,d)}
                    + offsets[j - ${c-d}u] - ${bp("uniforms.pads","j - 2u",k)};
                  ${l}
              }
              ${g}

              output[global_idx] = value;
            }`}},et=a=>`${a.format};${a.ceilMode};${a.autoPad};${a.kernelShape.length}`,eu=a=>({format:a.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][a.auto_pad],ceilMode:a.ceil_mode,kernelShape:a.kernel_shape,strides:a.strides,pads:a.pads}),ev=(a,b,c,d)=>{let[e,f]=eq(b,d,c),g=br("x",b.dataType,b.dims.length),h=g.type.value,i="";e.countIncludePad?i+=`value /= ${h}(uniforms.kernelSize);`:i+=`value /= ${h}(i32(uniforms.kernelSize) - pad);`;let[j,k,l,m,n]=er(f,e);return j.push(...bk(b.dims,f)),{name:a,shaderCache:{hint:`${d.cacheKey};${l};${m};${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:f,dataType:b.dataType}],dispatchGroup:{x:Math.ceil(bb.size(f)/64)},programUniforms:j}),getShaderSource:a=>es(a,g,b.dims.length,f.length,e,"value += x_val;",i,0,k,l,m,n)}},ew=a=>{let b,c=0!==a.count_include_pad,d=eu(a);if(0!==d.ceilMode)throw Error("using ceil() in shape computation is not yet supported for AveragePool");let e={countIncludePad:c,...d,cacheKey:""};return{...e,cacheKey:(b=e,`${et(b)};${b.countIncludePad}`)}},ex=(a,b)=>{ep(a.inputs),a.compute(ev("AveragePool",a.inputs[0],!1,b))},ey={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},ez=a=>{let b=a.format;return{format:b,...ey,cacheKey:b}},eA=(a,b)=>{ep(a.inputs),a.compute(ev("GlobalAveragePool",a.inputs[0],!0,b))},eB=(a,b,c,d)=>{let[e,f]=eq(b,d,c),g=`
      value = max(x_val, value);
    `,h=br("x",b.dataType,b.dims.length),[i,j,k,l,m]=er(f,e);return i.push(...bk(b.dims,f)),{name:a,shaderCache:{hint:`${d.cacheKey};${k};${l};${m}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:f,dataType:b.dataType}],dispatchGroup:{x:Math.ceil(bb.size(f)/64)},programUniforms:i}),getShaderSource:a=>es(a,h,b.dims.length,f.length,e,g,"",10===b.dataType?-65504:-1e5,j,k,l,m)}},eC=(a,b)=>{ep(a.inputs),a.compute(eB("MaxPool",a.inputs[0],!1,b))},eD=a=>{let b,c=a.storage_order,d=a.dilations,e=eu(a);if(0!==c)throw Error("column major storage order is not yet supported for MaxPool");if(0!==e.ceilMode)throw Error("using ceil() in shape computation is not yet supported for MaxPool");let f={storageOrder:c,dilations:d,...e,cacheKey:""};return{...f,cacheKey:(b=f,`${et(b)};${b.storageOrder};${b.dilations}`)}},eE=a=>{let b=a.format;return{format:b,...ey,cacheKey:b}},eF=(a,b)=>{ep(a.inputs),a.compute(eB("GlobalMaxPool",a.inputs[0],!0,b))}}),f6=O(()=>{fj(),fq(),fp(),fr(),eG=(a,b)=>{var c,d;let e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A;((a,b)=>{if(a.length<2||a.length>3)throw Error("DequantizeLinear requires 2 or 3 inputs.");if(3===a.length&&a[1].dims===a[2].dims)throw Error("x-scale and x-zero-point must have the same shape.");if(3===a.length&&a[0].dataType!==a[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(6===a[0].dataType&&a.length>2)throw Error("In the case of dequantizing int32 there is no zero point.");if(0!==a[1].dims.length&&1!==a[1].dims.length&&a[1].dims.length!==a[0].dims.length)throw Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(a.length>2){if(a[0].dataType!==a[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(a[1].dims.length!==a[2].dims.length)throw Error("scale and zero-point inputs must have the same rank.");if(!a[1].dims.map((b,c)=>b===a[2].dims[c]).reduce((a,b)=>a&&b,!0))throw Error("scale and zero-point inputs must have the same shape.")}if(b.blockSize>0){if(0===a[1].dims.length||1===a[1].dims.length&&1===a[1].dims[0])throw Error("blockSize must be set only for block quantization.");if(!a[1].dims.map((c,d)=>d===b.axis||c===a[0].dims[d]).reduce((a,b)=>a&&b,!0))throw Error("For block qunatization, scale input shape to match the input shape except for the axis");if(a[1].dims.length!==a[0].dims.length)throw Error("For block qunatization the scale input rank must be the same as the x rank.");let c=a[0].dims[b.axis],d=a[1].dims[b.axis];if(b.blockSize<Math.ceil(c/d)||b.blockSize>Math.ceil(c/(d-1)-1))throw Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}})(a.inputs,b),a.compute((c=a.inputs,d=b,e=bb.normalizeAxis(d.axis,c[0].dims.length),g=3===(f=c[0].dataType),h=c[0].dims,i=c[1].dataType,j=bb.size(h),l=(k=3===f||2===f)?[Math.ceil(bb.size(c[0].dims)/4)]:c[0].dims,m=c[1].dims,o=(n=c.length>2?c[2]:void 0)?k?[Math.ceil(bb.size(n.dims)/4)]:n.dims:void 0,q=!1==(p=0===m.length||1===m.length&&1===m[0])&&1===m.length,r=bl(j),t=(s=p&&(!k||4===r))?r:1,u=br("input",k?12:f,l.length,s&&!k?r:1),v=br("scale",i,m.length),w=n?br("zero_point",k?12:f,o.length):void 0,x=bs("output",i,h.length,t),y=[u,v],w&&y.push(w),z=[l,m],n&&z.push(o),A=[{type:12,data:j/t},{type:12,data:e},{type:12,data:d.blockSize},...bk(...z,h)],{name:"DequantizeLinear",shaderCache:{hint:d.cacheKey,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getShaderSource:a=>`
      ${a.registerUniforms([{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...y,x)}
      ${a.mainStart()}
          ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${x.offsetToIndices("global_idx")};

          // Set input x
          ${k?`
            let input = ${u.getByOffset("global_idx / 4")};
            let x_vec = ${g?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${1===t?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${u.getByOffset("global_idx")};`};

          // Set scale input
          ${p?`let scale_value= ${v.getByOffset("0")}`:q?`
            let scale_index = ${x.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${v.getByOffset("scale_index")};`:`
            var scale_indices: ${v.type.indices} = output_indices;
            let index = ${v.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${v.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${v.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${w?p?k?`
                let zero_point_input = ${w.getByOffset("0")};
                let zero_point_vec =  ${g?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${w.getByOffset("0")}`:q?k?`
                let zero_point_index = ${x.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${w.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${g?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${x.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${w.getByOffset("zero_point_index")};`:k?`
                let zero_point_offset = ${v.indicesToOffset("scale_indices")};
                let zero_point_input = ${w.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${g?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${w.getByIndices("scale_indices")};`:`let zero_point_value = ${k?g?"i32":"u32":u.type.value}(0);`};
      // Compute and write output
      ${x.setByOffset("global_idx",`${x.type.value}(x_value - zero_point_value) * scale_value`)};
      }`,getRunData:()=>({outputs:[{dims:h,dataType:i}],dispatchGroup:{x:Math.ceil(j/t/64),y:1,z:1},programUniforms:A})}))},eH=a=>a8({axis:a.axis,blockSize:a.blockSize})}),f7=O(()=>{ai(),fj(),fr(),eI=a=>{var b,c,d,e;let f,g,h,i=0,j=0,k=0;6===a.inputs[0].dataType?(i=a.inputs[0].getInt32Array()[0],j=a.inputs[1].getInt32Array()[0],k=a.inputs[2].getInt32Array()[0]):1===a.inputs[0].dataType&&(i=a.inputs[0].getFloat32Array()[0],j=a.inputs[1].getFloat32Array()[0],k=a.inputs[2].getFloat32Array()[0]),m.webgpu.validateInputContent&&((a,b,c)=>{if(a===b||a<b&&c<0||a>b&&c>0)throw Error("Range these inputs' contents are invalid.")})(i,j,k),a.compute((b=i,c=j,d=k,e=a.inputs[0].dataType,g=[f=Math.abs(Math.ceil((c-b)/d))],h=[{type:12,data:f},{type:e,data:b},{type:e,data:d},...bk(g)],{name:"Range",shaderCache:{hint:`${e}`},getShaderSource:a=>{let b=bs("output",e,g.length),c=b.type.value;return`
        ${a.registerUniforms([{name:"outputSize",type:"u32"},{name:"start",type:c},{name:"delta",type:c}]).declareVariables(b)}
        ${a.mainStart()}
        ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${c}(global_idx) * uniforms.delta;
      }`},getRunData:()=>({outputs:[{dims:g,dataType:e}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:h})}),{inputs:[]})}}),f8=O(()=>{fj(),fq(),fp(),fr(),eJ=a=>a8({reduction:a.reduction}),eK=(a,b)=>{var c,d;let e,f,g,h,i,j;a.compute((c=a.inputs,d=b,e=c[0].dims,f=c[1].dims,g=Math.ceil(bb.size(f)/1),h=f[f.length-1],i=bb.sizeFromDimension(e,h),j=[{type:12,data:g},{type:12,data:h},{type:12,data:i},...bk(c[1].dims,c[2].dims,e)],{name:"ScatterND",shaderCache:{hint:`${d.cacheKey}_${d.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:e,dataType:c[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:j}),getShaderSource:a=>{let b=br("indices",c[1].dataType,c[1].dims.length),g=br("updates",c[2].dataType,c[2].dims.length,1),h="none"!==d.reduction&&""!==d.reduction?bt("output",c[0].dataType,e.length):bs("output",c[0].dataType,e.length,1);return`
      ${a.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(b,g,h)}
      ${a.mainStart()}
        ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${"none"===d.reduction}) {
    let n = ${bb.size(f)};
    for (var i = 0; i < n; i = i + 1) {
      for (var j = i + 1; j < n; j = j + 1) {
        var index_i = i32(indices[i].x);
        var index_j = i32(indices[j].x);
        if (index_i == index_j) {
          hasDuplicates = true;
          break;
        }
      }
      if (hasDuplicates) {
        break;
      }
    }
  }

  var data_offset = 0u;
  var indices_start = uniforms.last_index_dimension * global_idx;
  if (${"none"===d.reduction} && hasDuplicates) {
    if (global_idx != 0u) {
      return;
    }
    indices_start = 0u;
  }
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${1===c[0].dims.length?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start + uniforms.last_index_dimension];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${((a,b,c,d)=>{if("none"!==a&&"i32"!==d&&"u32"!==d&&"f32"!==d)throw Error(`Input ${d} is not supported with reduction ${a}.`);let e=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,f=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${b}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(a){case"none":return`${b}=${c};`;case"add":return"i32"===d||"u32"===d?`atomicAdd(&${b}, bitcast<${d}>(${c}));`:`
              ${e}bitcast<${d}>(oldValue) + (${c})${f}`;case"max":return"i32"===d||"u32"===d?`atomicMax(&${b}, bitcast<${d}>(${c}));`:`
                ${e}max(bitcast<f32>(oldValue), (${c}))${f}`;case"min":return"i32"===d||"u32"===d?`atomicMin(&${b}, bitcast<${d}>(${c}));`:`${e}min(bitcast<${d}>(oldValue), (${c}))${f}`;case"mul":return`${e}(bitcast<${d}>(oldValue) * (${c}))${f}`;default:throw Error(`Reduction ${a} is not supported.`)}})(d.reduction,"output[data_offset + i]","value",h.type.value)}
  }

      }`}}),{inputs:[a.inputs[1],a.inputs[2]],outputs:[]})}}),f9=O(()=>{fj(),fq(),fp(),fr(),eL=(a,b,c,d)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${a}) * (${b});
  let whole = ${d}(big / (${c}));
  let fract = ${d}(big % (${c})) / ${d}(${c});
  return whole + fract;
`,eM=(a,b,c,d)=>a.rank>d?`
    ${a.indicesSet("input_indices",b,"channel")};
    ${a.indicesSet("input_indices",c,"batch")};
`:"",eN=(a,b)=>{var c,d,e,f,g,h,i,j,k,l,m,n;let o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E=[],F=[],G=[],H=new Uint32Array(o=a.customDataBuffer,o.byteOffset,1)[0];if(0!==b.antialias)throw Error("Only default value (0) for Antialias attribute is supported");((a,b,c,d,e,f)=>{let[g,h,i]=c>10?[1,2,3]:[-1,a.length>1?1:-1,-1],j=a[0].dims.length;if(g>0&&a.length>g&&a[g].dims.length>0)a[g].getFloat32Array().forEach(a=>f.push(a));else if("tf_crop_and_resize"===b.coordinateTransformMode)throw Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(h>0&&a.length>h&&1===a[h].dims.length&&a[h].dims[0]>0){var k,l,m;let e;if(a[h].getFloat32Array().forEach(a=>d.push(a)),0!==d.length&&d.length!==j&&c>=18&&d.length!==b.axes.length)throw Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");((a,b)=>{if(a.every(a=>a>0||(()=>{throw Error("Resize requires scales input values to be positive")})),a.length>0){if("linear"===b.mode){if(2!==a.length&&3!==a.length&&(4!==a.length||1!==a[0]||1!==a[1])&&(4!==a.length||1!==a[0]||1!==a[3])&&(5!==a.length||1!==a[0]||1!==a[1]))throw Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if("cubic"===b.mode&&2!==a.length&&(4!==a.length||1!==a[0]||1!==a[1])&&(4!==a.length||1!==a[0]||1!==a[3]))throw Error("Resize requires scales input size to be 2 or 4 for cubic mode")}})(d,b),b.axes.length>0&&(k=d,l=b.axes,m=j,l.every(a=>a>=0&&a<m||(()=>{throw Error("Resize requires axes input values to be positive and less than rank")})),e=Array(m).fill(1),l.forEach((a,b)=>e[a]=k[b]),e).forEach((a,b)=>d[b]=a)}if(i>0&&a.length>i&&1===a[i].dims.length&&a[i].dims[0]>0&&(a[i].getBigInt64Array().forEach(a=>e.push(Number(a))),0!==e.length&&e.length!==j&&c>=18&&e.length!==b.axes.length))throw Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(b.axes.length>0){if(0!==d.length&&d.length!==b.axes.length)throw Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(0!==e.length&&e.length!==b.axes.length)throw Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if("u">typeof d&&"u">typeof e&&d.length>0&&e.length>j)throw Error("Resize requires only of scales or sizes to be specified")})(a.inputs,b,H,E,F,G),a.compute((c=a.inputs[0],d=b,e=H,f=E,g=F,h=G,r=c.dims,s=(i=h,j=d.axes,p=Array(k=r.length).fill(0).concat(Array(k).fill(1)),q=0===i.length?p:i.slice(),j.length>0?(j.forEach((a,b)=>{p[a]=q[b],p[b+k]=q[j.length+b]}),p):q),t=((a,b,c,d)=>{let e=[];if(c.length>0)if(d.length>0){if(a.forEach(a=>e.push(a)),Math.max(...d)>a.length)throw Error("axes is out of bound");d.forEach((a,b)=>e[a]=c[b])}else c.forEach(a=>e.push(a));else{if(0===b.length)throw Error("Resize requires either scales or sizes.");e=a.map((a,c)=>Math.round(a*b[c]))}return e})(r,f,g,d.axes),u=f.slice(),0===f.length&&(u=r.map((a,b)=>0===a?1:t[b]/a),"stretch"!==d.keepAspectRatioPolicy&&(l=r,m=u,n=d,v=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(a=>m[a]),Number.MAX_VALUE):Math.min(...m,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(a=>m[a]),5e-324):Math.max(...m,5e-324);default:throw Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})(),m.fill(1,0,m.length),w=l.slice(),n.axes.length>0?(n.axes.forEach(a=>m[a]=v),n.axes.forEach(a=>w[a]=Math.round(l[a]*m[a]))):(m.fill(v,0,m.length),w.forEach((a,b)=>w[b]=Math.round(a*m[b]))),t=w)),x=bs("output",c.dataType,t.length),y=br("input",c.dataType,r.length),z=bb.size(t),A=r.length===t.length&&r.every((a,b)=>a===t[b]),B="tf_crop_and_resize"===d.coordinateTransformMode,C=d.extrapolationValue,D=y.type.value,{name:"Resize",shaderCache:{hint:`${d.cacheKey}|${e}|${u.length>0?"cubic"===d.mode?u:u.length:""}|${g.length>0?g:""}|${s.length>0?s:""}|${A}|${"nearest"===d.mode?r.length:r}`,inputDependencies:["rank"]},getShaderSource:a=>{let b,c;return`
      ${A?"":`
      ${b=d.coordinateTransformMode,c=D,`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${c} { `+(()=>{switch(b){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${c}(xResized) / ${c}(xScale);
          } else {
            ${eL("xResized","lengthOriginal","lengthResized",c)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${c}(xResized) + 0.5) / ${c}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${c}(xResized) + 0.5) / ${c}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${eL("xResized","lengthOriginal - 1","lengthResized - 1",c)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${c}(roiStart) * ${c}(lengthOriginal - 1) +
                        (${c}(xResized) * ${c}(roiEnd - roiStart) * ${c}(lengthOriginal - 1)) /
                        ${c}(lengthResized - 1);
                  } else {
                    return 0.5 * ${c}(roiStart + roiEnd) * ${c}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${c}xScale * ${c}(lengthResized);
                  const adjustment = ${c}(lengthResized) / outputWidth;
                  const center = ${c}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${c}(xResized) + 0.5) / ${c}(xScale)) - 0.5;`;case"half_pixel":return`return ((${c}(xResized) + 0.5) / ${c}(xScale)) - 0.5;`;default:throw Error(`Coordinate transform mode ${b} is not supported`)}})()+"}"};
      ${(()=>{switch(d.mode){case"nearest":let a,b,c,f,g,h,i,j,k,l,m,n;return`
              ${a=y,b=r,`
    fn checkInputIndices(input_indices: ${a.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${b.length}; i++) {
        var input_index = ${a.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${bp("uniforms.input_shape","i",b.length)}) {
          return false;
        }
      }
      return true;
    }`};
              ${c=d.nearestMode,f=e,g=D,`fn getNearestPixelFromOriginal(xOriginal: ${g}, isDownSample: bool) -> ${g} {`+(()=>{switch(c){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(f<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw Error(`Nearest mode ${c} is not supported`)}})()+"}"};
              ${h=y,i=x,j=r,k=t,l=u.length,m=s.length,n=B,`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${i.type.indices}) -> ${h.type.indices} {
      var input_indices: ${h.type.indices};
      for (var i:u32 = 0; i < ${k.length}; i++) {
        var output_index = ${i.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${bp("uniforms.scales","i",l)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${bp("uniforms.roi","i",m)};
          var roi_hi = ${bp("uniforms.roi",`i + ${j.length}`,m)};
          var input_shape_i = ${bp("uniforms.input_shape","i",j.length)};
          var output_shape_i = ${bp("uniforms.output_shape","i",k.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${n} || (original_idx >= 0 && original_idx < ${i.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${i.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${h.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`};
              `;case"linear":let o,p,q,v,w;return`
              ${o=x,p=r,q=t,v=u.length,w=s.length,`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${o.type.indices}) -> array<${o.type.value}, ${q.length}> {
      var original_indices: array<${o.type.value}, ${q.length}>;
      for (var i:u32 = 0; i < ${q.length}; i++) {
        var output_index = ${o.indicesGet("output_indices","i")};
        var scale = ${bp("uniforms.scales","i",v)};
        var roi_low = ${bp("uniforms.roi","i",w)};
        var roi_hi = ${bp("uniforms.roi",`i + ${p.length}`,w)};
        if (scale == 1.0) {
          original_indices[i] = ${o.type.value}(output_index);
        } else {
          var input_shape_i = ${bp("uniforms.input_shape","i",p.length)};
          var output_shape_i = ${bp("uniforms.output_shape","i",q.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`};
              ${(()=>{if(2===r.length||4===r.length)return`${((a,b,c,d,e)=>{let[f,g,h,i]=2===c.length?[-1,0,1,-1]:[0,2,3,1],j=a.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${j} {
      var input_indices: ${a.type.indices};
      ${a.indicesSet("input_indices",g,`max(0, min(row, ${c[g]} - 1))`)};
      ${a.indicesSet("input_indices",h,`max(0, min(col, ${c[h]} - 1))`)};
      ${eM(a,i,f,2)}
      return ${a.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${b.type.indices}) -> ${j} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${j} = originalIndices[${g}];
      var col:${j} = originalIndices[${h}];
      ${d?`if (row < 0 || row > (${c[g]} - 1) || col < 0 || col > (${c[h]} - 1)) {
        return ${e};
      }`:""};
      row = max(0, min(row, ${c[g]} - 1));
      col = max(0, min(col, ${c[h]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${c.length>2?`u32(originalIndices[${i}])`:"0"};
      var batch: u32 =  ${c.length>2?`u32(originalIndices[${f}])`:"0"};
      var x11: ${j} = getInputValue(batch, channel, row1, col1);
      var x12: ${j} = getInputValue(batch, channel, row1, col2);
      var x21: ${j} = getInputValue(batch, channel, row2, col1);
      var x22: ${j} = getInputValue(batch, channel, row2, col2);
      var dx1: ${j} = abs(row - ${j}(row1));
      var dx2: ${j} = abs(${j}(row2) - row);
      var dy1: ${j} = abs(col - ${j}(col1));
      var dy2: ${j} = abs(${j}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`})(y,x,r,B,C)}`;if(3===r.length||5===r.length)return`${((a,b,c,d,e)=>{let[f,g,h,i,j]=3===c.length?[-1,0,1,2,-1]:[0,2,3,4,1],k=a.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${k} {
      var input_indices: ${a.type.indices};
      ${a.indicesSet("input_indices",g,`max(0, min(depth, ${c[g]} - 1))`)};
      ${a.indicesSet("input_indices",h,`max(0, min(height, ${c[h]} - 1))`)};
      ${a.indicesSet("input_indices",i,`max(0, min(width, ${c[i]} - 1))`)};
      ${eM(a,j,f,3)}
      return ${a.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${b.type.indices}) -> ${k} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${k} = originalIndices[${g}];
      var height:${k} = originalIndices[${h}];
      var width:${k} = originalIndices[${i}];
      ${d?`if (depth < 0 || depth > (${c[g]} - 1) || height < 0 || height > (${c[h]} - 1) || width < 0 || (width > ${c[i]} - 1)) {
      return ${e};
        }`:""};

    depth = max(0, min(depth, ${c[g]} - 1));
      height = max(0, min(height, ${c[h]} - 1));
      width = max(0, min(width, ${c[i]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${c.length>3?`u32(originalIndices[${j}])`:"0"};
      var batch: u32 =  ${c.length>3?`u32(originalIndices[${f}])`:"0"};

      var x111: ${k} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${k} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${k} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${k} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${k} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${k} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${k} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${k} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${k} = abs(depth - ${k}(depth1));
      var dx2: ${k} = abs(${k}(depth2) - depth);
      var dy1: ${k} = abs(height - ${k}(height1));
      var dy2: ${k} = abs(${k}(height2) - height);
      var dz1: ${k} = abs(width - ${k}(width1));
      var dz2: ${k} = abs(${k}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`})(y,x,r,B,C)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(2===r.length||4===r.length)return`${((a,b,c,d,e,f,g,h,i,j)=>{let[k,l]=2===c.length?[0,1]:[2,3],m=a.type.value,n=g=>{let l=g===k?"row":"col";return`
      fn ${l}CubicInterpolation(input_indices: ${a.type.indices}, output_indices: ${b.type.indices}) -> ${m} {
        var output_index = ${b.indicesGet("output_indices",g)};
        var originalIdx: ${m} = getOriginalCoordinateFromResizedCoordinate(output_index, ${e[g]},
        ${d[g]}, ${c[g]}, ${f[g]}, ${f[g]} + ${c.length});
        var fractOriginalIdx: ${m} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${h} && (originalIdx < 0 || originalIdx > (${c[g]} - 1))) {
          return ${i};
        }
        var data: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${l}: ${m} = originalIdx + ${m}(i);
          if (${l} < 0 || ${l} >= ${c[g]}) {
            ${j?`coefs[i + 1] = 0.0;
                        continue;`:h?`return ${i};`:`${l} = max(0, min(${l}, ${c[g]} - 1));`};
          }
        var input_indices_copy: ${a.type.indices} = input_indices;
          ${a.indicesSet("input_indices_copy",g,`u32(${l})`)};
          data[i + 1] = ${g===k?a.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${n(k)};
    ${n(l)};
  fn getCubicInterpolationCoefs(s: ${m}) -> array<${m}, 4> {
    var absS = abs(s);
    var coeffs: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${m} = 1.0 - absS;
    var twoMinusAbsS: ${m} = 2.0 - absS;
    var onePlusAbsS: ${m} = 1.0 + absS;
    coeffs[0] = ((${g} * onePlusAbsS - 5 * ${g}) * onePlusAbsS + 8 * ${g}) * onePlusAbsS - 4 * ${g};
    coeffs[1] = ((${g} + 2) * absS - (${g} + 3)) * absS * absS + 1;
    coeffs[2] = ((${g} + 2) * oneMinusAbsS - (${g} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${g} * twoMinusAbsS - 5 * ${g}) * twoMinusAbsS + 8 * ${g}) * twoMinusAbsS - 4 * ${g};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${m}, 4>, coefs: array<${m}, 4>) -> ${m} {
    var coefsSum: ${m} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${b.type.indices}) -> ${m} {
    var input_indices: ${a.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `})(y,x,r,t,u,s,d.cubicCoeffA,B,d.extrapolationValue,d.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${a.registerUniform("output_size","u32").registerUniform("scales","f32",u.length).registerUniform("roi","f32",s.length).declareVariables(y,x)}
      ${a.mainStart()}
        ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${A?"output[global_idx] = input[global_idx];":`
        let output_indices = ${x.offsetToIndices("global_idx")};
        var input_indices: ${y.type.indices};
        ${(()=>{switch(d.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${y.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${d.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${2===r.length||4===r.length?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${d.mode}`)}})()};
`}
      }`},getRunData:()=>({outputs:[{dims:t,dataType:c.dataType}],dispatchGroup:{x:Math.ceil(z/64)},programUniforms:[{type:12,data:z},{type:1,data:u},{type:1,data:s},...bk(r,t)]})}),{inputs:[0]})},eO=a=>{let b=a.antialias,c=a.axes,d=a.coordinateTransformMode,e=a.cubicCoeffA,f=0!==a.excludeOutside,g=a.extrapolationValue,h=a.keepAspectRatioPolicy,i=a.mode,j=""===a.nearestMode?"simple":a.nearestMode;return a8({antialias:b,axes:c,coordinateTransformMode:d,cubicCoeffA:e,excludeOutside:f,extrapolationValue:g,keepAspectRatioPolicy:h,mode:i,nearestMode:j})}}),ga=O(()=>{fj(),fq(),fp(),fr(),eP=(a,b)=>{((a,b)=>{let[c,d,e,f]=a,{numHeads:g,rotaryEmbeddingDim:h}=b;if(3!==c.dims.length&&4!==c.dims.length)throw Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${c.dims.length}`);if(!bb.areEqual(d.dims,[])&&!bb.areEqual(d.dims,[1])&&2!==d.dims.length)throw Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${d.dims.length}`);if(2!==e.dims.length)throw Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${e.dims.length}`);if(2!==f.dims.length)throw Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${f.dims.length}`);if(!bb.areEqual(e.dims,f.dims))throw Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(h>0&&0===g)throw Error("num_heads must be provided if rotary_embedding_dim is specified");let i=c.dims[0],j=c.dims[c.dims.length-2],k=e.dims[0],l=bb.sizeFromDimension(c.dims,1)/j,m=0===h?2*e.dims[1]:l/g;if(h>m)throw Error("rotary_embedding_dim must be less than or equal to head_size");if(2===d.dims.length){if(i!==d.dims[0])throw Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${d.dims[0]}`);if(j!==d.dims[1])throw Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${d.dims[1]}`)}if(m/2!==e.dims[1]&&h/2!==e.dims[1])throw Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${e.dims[1]}`);if(j>k)throw Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")})(a.inputs,b),a.compute(((a,b)=>{let{interleaved:c,numHeads:d,rotaryEmbeddingDim:e,scale:f}=b,g=a[0].dims[0],h=bb.sizeFromDimension(a[0].dims,1),i=a[0].dims[a[0].dims.length-2],j=h/i,k=a[2].dims[1],l=0===e?2*k:j/d,m=[g,i,j/l,l-k],n=bb.computeStrides(m),o=[{type:1,data:f},{type:12,data:m},{type:12,data:n},...3===a[0].dims.length?Array({type:12,data:[h,j,l,1]}):[],...4===a[0].dims.length?Array({type:12,data:[h,l,i*l,1]}):[],...bk(a[0].dims,a[1].dims,a[2].dims,a[3].dims,a[0].dims)];return{name:"RotaryEmbedding",shaderCache:{hint:a8({interleaved:c}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:b=>{let d=br("input",a[0].dataType,a[0].dims.length),e=br("position_ids",a[1].dataType,a[1].dims.length),f=br("cos_cache",a[2].dataType,a[2].dims.length),g=br("sin_cache",a[3].dataType,a[3].dims.length),h=bs("output",a[0].dataType,a[0].dims.length);return b.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:m.length},{name:"global_strides",type:"u32",length:n.length},{name:"input_output_strides",type:"u32",length:n.length}]),`
        ${b.declareVariables(d,e,f,g,h)}

        ${b.mainStart(bg)}
          let half_rotary_emb_dim = uniforms.${f.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${e.broadcastedIndicesToOffset("bsnh.xy",bs("",e.type.tensor,2))};
            let position_id =
                u32(${e.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${c});
            let j = i + select(half_rotary_emb_dim, 1, ${c});
            let re = ${d.getByOffset("i")} * ${f.get("position_id","bsnh[3]")} -
                ${d.getByOffset("j")} * ${g.get("position_id","bsnh[3]")};
            ${h.setByOffset("i","re")}
            let im = ${d.getByOffset("i")} * ${g.get("position_id","bsnh[3]")} +
                ${d.getByOffset("j")} * ${f.get("position_id","bsnh[3]")};
            ${h.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${h.setByOffset("k",d.getByOffset("k"))}
          }
        }`},getRunData:()=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],dispatchGroup:{x:Math.ceil(bb.size(m)/bg)},programUniforms:o})}})(a.inputs,b))}}),gb=O(()=>{fj(),fq(),fr(),eQ=(a,b)=>{var c,d,e,f;let g,h,i,j,k,l,m,n,o,p,q,r,s;(a=>{if(!a||a.length<3)throw Error("layerNorm requires at least 3 inputs.");let b=a[0],c=a[1],d=a[2];if(b.dataType!==c.dataType||b.dataType!==d.dataType)throw Error("All inputs must have the same data type");if(3!==b.dims.length&&2!==b.dims.length)throw Error("Input must be 2D or 3D");if(3!==c.dims.length&&2!==c.dims.length)throw Error("Skip must be 2D or 3D");let e=b.dims[b.dims.length-1],f=b.dims[b.dims.length-2];if(c.dims[c.dims.length-1]!==e)throw Error("Skip must have the same hidden size as input");if(c.dims[c.dims.length-2]!==f)throw Error("Skip must have the same sequence length as input");if(1!==d.dims.length)throw Error("Gamma must be 1D");if(d.dims[d.dims.length-1]!==e)throw Error("Gamma must have the same hidden size as input");if(a.length>3){let b=a[3];if(1!==b.dims.length)throw Error("Beta must be 1D");if(b.dims[b.dims.length-1]!==e)throw Error("Beta must have the same hidden size as input")}if(a.length>4){let b=a[4];if(1!==b.dims.length)throw Error("Bias must be 1D");if(b.dims[b.dims.length-1]!==e)throw Error("Bias must have the same hidden size as input")}})(a.inputs);let t=[0];a.outputCount>1&&t.push(-3),a.outputCount>2&&t.push(-3),a.outputCount>3&&t.push(3),a.compute((c=a.inputs,d=b,e=a.outputCount,f=!1,g=d.simplified,h=c[0].dims,i=bb.size(h),j=h.slice(-1)[0],k=f?h.slice(0,-1).concat(1):[],l=!g&&c.length>3,m=c.length>4,n=f&&e>1,o=f&&e>2,p=e>3,r=[{type:12,data:i},{type:12,data:q=bl(j)},{type:12,data:j},{type:1,data:d.epsilon}],s=[{dims:h,dataType:c[0].dataType}],e>1&&s.push({dims:k,dataType:1}),e>2&&s.push({dims:k,dataType:1}),e>3&&s.push({dims:h,dataType:c[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${q};${n};${o};${p}`,inputDependencies:c.map((a,b)=>"type")},getShaderSource:a=>{let b=[br("x",c[0].dataType,c[0].dims,q),br("skip",c[1].dataType,c[1].dims,q),br("gamma",c[2].dataType,c[2].dims,q)];l&&b.push(br("beta",c[3].dataType,c[3].dims,q)),m&&b.push(br("bias",c[4].dataType,c[4].dims,q)),b.push(bs("output",c[0].dataType,h,q)),n&&b.push(bs("mean_output",1,k)),o&&b.push(bs("inv_std_output",1,k)),p&&b.push(bs("input_skip_bias_sum",c[0].dataType,h,q));let d=bi(c[0].dataType),e=bi(1,q);return`

      ${a.registerUniforms([{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...b)}
      var<workgroup> sum_shared : array<${e}, 64>;
      var<workgroup> sum_squared_shared : array<${e}, 64>;

      ${a.mainStart([64,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / 64;

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / 64;
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == 63) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${m?"bias[offset1d + i]":d+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${p?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${bn(d,q,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = 64;
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${bo("sum",q)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${bo("square_sum",q)} / f32(uniforms.hidden_size) ${g?"":"- mean * mean"} + uniforms.epsilon);
        ${n?"mean_output[global_idx] = mean;":""}
        ${o?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${g?"":`- ${d}(mean)`}) *
            ${d}(inv_std_dev) * gamma[offset1d + i]
            ${l?"+ beta[offset1d + i]":""};
        }
      }`},getRunData:()=>({outputs:s,dispatchGroup:{x:Math.ceil(i/j)},programUniforms:r})}),{outputs:t})}}),gc=O(()=>{fj(),fq(),fp(),fr(),eR=(a,b)=>{let c=[];if(a.length>b)if(7===a[b].dataType)a[b].getBigInt64Array().forEach(a=>c.push(Number(a)));else if(6===a[b].dataType)a[b].getInt32Array().forEach(a=>c.push(Number(a)));else throw Error(`Input ${b} must be an array of int32 or int64`);return c},eS=(a,b,c,d,e)=>{let f=a;return a<0&&(f+=c[d[b]]),e[b]<0?Math.max(0,Math.min(f,c[d[b]]-1)):Math.max(0,Math.min(f,c[d[b]]))},eT=(a,b)=>{var c=a.inputs,d=b;if(!c||c.length<1)throw Error("too few inputs");if(0!==d.axes.length){if(d.axes.length!==d.starts.length||d.axes.length!==d.ends.length)throw Error("axes, starts and ends must have the same length")}else if(d.starts.length!==d.ends.length)throw Error("starts and ends must have the same length");c.slice(1).forEach((a,b)=>{if(6!==c[b+1].dataType&&7!==c[b+1].dataType)throw Error(`Input ${b} must be an array of int32 or int64`)});let e=((a,b)=>{if(!(a.length>1))return b;{let b=eR(a,1),c=eR(a,2),d=eR(a,3);return 0===d.length&&(d=[...Array(a[0].dims.length).keys()]),a8({starts:b,ends:c,axes:d})}})(a.inputs,b);a.compute(((a,b)=>{let c=a[0].dims,d=bb.size(c),e=b.axes.length>0?bb.normalizeAxes(b.axes,c.length):[...Array(c.length).keys()],f=eR(a,4);f.forEach(a=>0!==a||(()=>{throw Error("step cannot be 0")})),0===f.length&&(f=Array(e.length).fill(1));let g=b.starts.map((a,b)=>eS(a,b,c,e,f)),h=b.ends.map((a,b)=>eS(a,b,c,e,f));if(e.length!==g.length||e.length!==h.length)throw Error("start, ends and axes should have the same number of elements");if(e.length!==c.length)for(let a=0;a<c.length;++a)e.includes(a)||(g.splice(a,0,0),h.splice(a,0,c[a]),f.splice(a,0,1));let i=f.map(a=>Math.sign(a));f.forEach((a,b,c)=>{if(a<0){let d=(h[b]-g[b])/a,e=g[b],i=e+d*f[b];g[b]=i,h[b]=e,c[b]=-a}});let j=c.slice(0);e.forEach((a,b)=>{j[a]=Math.ceil((h[a]-g[a])/f[a])});let k={dims:j,dataType:a[0].dataType},l=bs("output",a[0].dataType,j.length),m=br("input",a[0].dataType,a[0].dims.length),n=bb.size(j),o=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:g.length},{name:"signs",type:"i32",length:i.length},{name:"steps",type:"u32",length:f.length}],p=[{type:12,data:n},{type:12,data:g},{type:6,data:i},{type:12,data:f},...bk(a[0].dims,j)];return{name:"Slice",shaderCache:{hint:`${i.length}_${g.length}_${f.length}`,inputDependencies:["rank"]},getShaderSource:a=>{let b,d,e;return`
      ${a.registerUniforms(o).declareVariables(m,l)}
        ${b=m,d=l,e=c,`fn calculateInputIndices(output_indices: ${d.type.indices}) -> ${b.type.indices} {
          var input_indices: ${b.type.indices};
          var carry = 0u;
          for (var i = ${e.length}; i >= 0; i--) {
            let input_shape_i = ${bp("uniforms.input_shape","i",e.length)};
            let steps_i = ${bp("uniforms.steps","i",e.length)};
            let signs_i = ${bp("uniforms.signs","i",e.length)};
            let starts_i = ${bp("uniforms.starts","i",e.length)};
            var output_index = ${d.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${b.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`}
        ${a.mainStart()}
          ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${l.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${l.setByOffset("global_idx",m.getByIndices("input_indices"))}
      }`},getRunData:()=>({outputs:[k],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p})}})(a.inputs,e),{inputs:[0]})},eU=a=>{let b=a.starts,c=a.ends,d=a.axes;return a8({starts:b,ends:c,axes:d})}}),gd=O(()=>{fj(),fq(),fp(),fs(),fr(),eV=(a,b)=>{var c,d;let e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w;(a=>{if(!a||1!==a.length)throw Error("Softmax op requires 1 input.")})(a.inputs),c=a,d=b,f=(e=c.inputs[0]).dims,g=bb.size(f),h=f.length,j=(i=bb.normalizeAxis(d.axis,h))<f.length-1,l=[],j?((l=Array.from({length:h},(a,b)=>b))[i]=h-1,l[h-1]=i,k=c.compute(by(e,l),{inputs:[e],outputs:[-1]})[0]):k=e,o=g/(n=(m=k.dims)[h-1]),p=bl(n),q=n/p,r=64,1===o&&(r=256),s=br("x",k.dataType,k.dims,p),t=bs("result",k.dataType,k.dims,p),u=s.type.value,v="f32"===bi(k.dataType)?`var threadMax = ${u}(-3.402823e+38f);`:`var threadMax = ${u}(-65504.0h);`,w=c.compute({name:"Softmax",shaderCache:{hint:`${p};${r}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:m,dataType:k.dataType}],dispatchGroup:{x:o},programUniforms:[{type:6,data:q}]}),getShaderSource:a=>{let b;return`
      var<workgroup> rowMaxShared : ${u};
      var<workgroup> rowSumShared : ${u};
      var<workgroup> threadShared : array<${u}, ${r}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${u} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${u}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${a.registerUniform("packedCols","i32").declareVariables(s,t)}
      ${a.mainStart(r)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${r};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${v}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${u}(${b="threadShared[0]",4===p?`max(max(${b}.x, ${b}.y), max(${b}.z, ${b}.w))`:2===p?`max(${b}.x, ${b}.y)`:3===p?`max(max(${b}.x, ${b}.y), ${b}.z)`:b});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${u}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${u}(${bo("threadShared[0]",p)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`}},{inputs:[k],outputs:[j?-1:0]})[0],j&&c.compute(by(w,l),{inputs:[w]})},eW=a=>a8({axis:a.axis})}),ge=O(()=>{fj(),fq(),fr(),eX=a=>Array.from(a.getBigInt64Array(),Number),eY=a=>{var b;let c,d,e,f,g,h,i;(a=>{if(!a||2!==a.length)throw Error("Tile requires 2 inputs.");if(1!==a[0].dataType&&10!==a[0].dataType&&6!==a[0].dataType&&12!==a[0].dataType)throw Error("Tile only support float, float16, int32, and uint32 data types");if(7!==a[1].dataType)throw Error("Tile `repeats` input should be of int64 data type");if(1!==a[1].dims.length)throw Error("Tile `repeats` input should be 1-D");if(eX(a[1]).length!==a[0].dims.length)throw Error("Tile `repeats` input should have same number of elements as rank of input data tensor")})(a.inputs),a.compute((c=(b=a.inputs)[0].dims,e=((a,b)=>{let c=[];for(let d=0;d<a.length;++d)c.push(a[d]*b[d]);return c})(c,d=(void 0)??eX(b[1])),f=bb.size(e),g=b[0].dataType,h=br("input",g,c.length),i=bs("output",g,e.length),{name:"Tile",shaderCache:{hint:`${d}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:b[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...bk(b[0].dims,e)]}),getShaderSource:a=>`
      const inputShape = ${h.indices(...c)};
      ${a.registerUniform("output_size","u32").declareVariables(h,i)}
      ${a.mainStart()}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${i.offsetToIndices("global_idx")};
      var input_indices: ${h.type.indices};
      for (var i = 0; i < ${c.length}; i++) {
        let input_dim_i = ${h.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${i.indicesGet("output_indices","i")}  % input_dim_i;

        ${h.indicesSet("input_indices","i","input_dim_value")}
      }
      ${i.setByOffset("global_idx",h.getByIndices("input_indices"))}
    }`}),{inputs:[0]})}}),gf=O(()=>{fj(),fq(),fr(),eZ=a=>{a.compute((a=>{let b=a[1].dims,c=a[2].dims,d=a[0].dims,e=a[1].dataType,f=!(bb.areEqual(b,c)&&bb.areEqual(c,d)),g=b,h=bb.size(b);if(f){let a=ba.calcShape(ba.calcShape(b,c,!1),d,!1);if(!a)throw Error("Can't perform where op on the given tensors");g=a,h=bb.size(g)}let i=Math.ceil(h/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:b=>((a,b,c,d,e)=>{let f=bs("output_data",e,c.length,4),g=br("a_data",b[1].dataType,b[1].dims.length,4),h=br("b_data",b[2].dataType,b[2].dims.length,4),i=br("c_data",b[0].dataType,b[0].dims.length,4),j,k=(a,b,c)=>`select(${b}, ${a}, ${c})`;if(d){let a=(a,b,c="")=>{let d=`a_data[index_a${b}][component_a${b}]`,e=`b_data[index_b${b}][component_b${b}]`,j=`bool(c_data[index_c${b}] & (0xffu << (component_c${b} * 8)))`;return`
            let output_indices${b} = ${f.offsetToIndices(`global_idx * 4u + ${b}u`)};
            let offset_a${b} = ${g.broadcastedIndicesToOffset(`output_indices${b}`,f)};
            let offset_b${b} = ${h.broadcastedIndicesToOffset(`output_indices${b}`,f)};
            let offset_c${b} = ${i.broadcastedIndicesToOffset(`output_indices${b}`,f)};
            let index_a${b} = offset_a${b} / 4u;
            let index_b${b} = offset_b${b} / 4u;
            let index_c${b} = offset_c${b} / 4u;
            let component_a${b} = offset_a${b} % 4u;
            let component_b${b} = offset_b${b} % 4u;
            let component_c${b} = offset_c${b} % 4u;
            ${a}[${b}] = ${c}(${k(d,e,j)});
          `};j=9===e?`
            var data = vec4<u32>(0);
            ${a("data",0,"u32")}
            ${a("data",1,"u32")}
            ${a("data",2,"u32")}
            ${a("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:`
            ${a("output_data[global_idx]",0)}
            ${a("output_data[global_idx]",1)}
            ${a("output_data[global_idx]",2)}
            ${a("output_data[global_idx]",3)}
          `}else j=f.setByOffset("global_idx",k(g.getByOffset("global_idx"),h.getByOffset("global_idx"),i.getByOffset("global_idx")));return`
        ${a.registerUniform("vec_size","u32").declareVariables(i,g,h,f)}
        ${a.mainStart()}
        ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${j}
      }`})(b,a,g,f,e),getRunData:()=>({outputs:[{dims:g,dataType:e}],dispatchGroup:{x:Math.ceil(h/64/4)},programUniforms:[{type:12,data:i},...bk(d,b,c,g)]})}})(a.inputs))}}),gg=O(()=>{fv(),fw(),fx(),fy(),fA(),fB(),fC(),fL(),fN(),fO(),fP(),fQ(),fR(),fS(),fT(),fU(),fV(),fW(),fX(),fY(),f_(),f0(),f1(),f2(),f3(),fZ(),f4(),f5(),f6(),f7(),f8(),fu(),f9(),ga(),gb(),gc(),gd(),f$(),ge(),fs(),fz(),gf(),e$=new Map([["Abs",[ce]],["Acos",[cf]],["Acosh",[cg]],["Add",[cV]],["ArgMax",[b6,b7]],["ArgMin",[b5,b7]],["Asin",[ch]],["Asinh",[ci]],["Atan",[cj]],["Atanh",[ck]],["Attention",[ca]],["AveragePool",[ex,ew]],["BatchNormalization",[cb]],["BiasAdd",[cc]],["BiasSplitGelu",[cT]],["Cast",[cm,cl]],["Ceil",[co]],["Clip",[cn]],["Concat",[c3,c4]],["Conv",[dv,dt]],["ConvTranspose",[dC,dA]],["Cos",[cp]],["Cosh",[cq]],["CumSum",[dD,dE]],["DepthToSpace",[dF,dG]],["DequantizeLinear",[eG,eH]],["Div",[cW]],["Einsum",[dN,dO]],["Elu",[cs,cr]],["Equal",[cX]],["Erf",[cu]],["Exp",[cv]],["Expand",[dQ]],["FastGelu",[dR]],["Floor",[cw]],["FusedConv",[dv,dt]],["Gather",[dT,dS]],["GatherElements",[dZ,dY]],["GatherBlockQuantized",[dW,dX]],["GatherND",[dU,dV]],["Gelu",[cx]],["Gemm",[d_,d$]],["GlobalAveragePool",[eA,ez]],["GlobalMaxPool",[eF,eE]],["Greater",[c_]],["GreaterOrEqual",[c1]],["GridSample",[d5,d6]],["GroupQueryAttention",[eh]],["HardSigmoid",[cF,cE]],["InstanceNormalization",[ej]],["LayerNormalization",[ek]],["LeakyRelu",[cy,cr]],["Less",[c0]],["LessOrEqual",[c2]],["Log",[cQ]],["MatMul",[el]],["MatMulNBits",[em,en]],["MaxPool",[eC,eD]],["Mul",[cY]],["MultiHeadAttention",[eb,d8]],["Neg",[cA]],["Not",[cz]],["Pad",[eo]],["Pow",[cZ]],["QuickGelu",[cS,cr]],["Range",[eI]],["Reciprocal",[cB]],["ReduceMin",[b_]],["ReduceMean",[bW]],["ReduceMax",[b$]],["ReduceSum",[b1]],["ReduceProd",[b0]],["ReduceL1",[bX]],["ReduceL2",[bY]],["ReduceLogSum",[b3]],["ReduceLogSumExp",[bZ]],["ReduceSumSquare",[b2]],["Relu",[cC]],["Resize",[eN,eO]],["RotaryEmbedding",[eP]],["ScatterND",[eK,eJ]],["Sigmoid",[cD]],["Sin",[cG]],["Sinh",[cH]],["Slice",[eT,eU]],["SkipLayerNormalization",[eQ]],["Split",[ed,ee]],["Sqrt",[cI]],["Softmax",[eV,eW]],["Sub",[c$]],["Tan",[cJ]],["Tanh",[cL]],["ThresholdedRelu",[cP,cr]],["Tile",[eY]],["Transpose",[bz,bA]],["Where",[eZ]]])}),gh=O(()=>{ai(),fl(),fr(),e_=class{constructor(a){this.backend=a,this.repo=new Map,this.attributesBound=!1}getArtifact(a){return this.repo.get(a)}setArtifact(a,b){this.repo.set(a,b)}run(a,b,c,d,e){F(a.programInfo.name);let f=this.backend.device,g=this.backend.getComputePassEncoder();this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber);let h=[];for(let a of b)h.push({binding:h.length,resource:{buffer:a.buffer}});for(let a of c)h.push({binding:h.length,resource:{buffer:a.buffer}});e&&h.push({binding:h.length,resource:e});let i=f.createBindGroup({layout:a.computePipeline.getBindGroupLayout(0),entries:h,label:a.programInfo.name});if("capturing"===this.backend.sessionStatus){let b={kernelId:this.backend.currentKernelId,computePipeline:a.computePipeline,bindGroup:i,dispatchGroup:d};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(b)}g.setPipeline(a.computePipeline),g.setBindGroup(0,i),g.dispatchWorkgroups(...d),this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||"at-passes"===this.backend.queryType)&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),G(a.programInfo.name)}dispose(){}build(a,b){F(a.name);let c=this.backend.device,d=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"},{feature:"subgroups-f16",extension:"subgroups_f16"}].forEach(a=>{c.features.has(a.feature)&&d.push(`enable ${a.extension};`)});let e=bw(b,this.backend.device.limits),f=a.getShaderSource(e),g=`${d.join(`
`)}
${e.additionalImplementations}
${f}`,h=c.createShaderModule({code:g,label:a.name});aZ("verbose",()=>`[WebGPU] ${a.name} shader code: ${g}`);let i=c.createComputePipeline({compute:{module:h,entryPoint:"main"},layout:"auto",label:a.name});return G(a.name),{programInfo:a,computePipeline:i,uniformVariablesInfo:e.variablesInfo}}normalizeDispatchGroupSize(a){let b="number"==typeof a?a:a.x,c="number"==typeof a?1:a.y||1,d="number"==typeof a?1:a.z||1,e=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(b<=e&&c<=e&&d<=e)return[b,c,d];let f=b*c*d,g=Math.ceil(Math.sqrt(f));if(!(g>e))return[g,g,1];if((g=Math.ceil(Math.cbrt(f)))>e)throw Error("Total dispatch size exceeds WebGPU maximum.");return[g,g,g]}}}),gi=O(()=>{ai(),fj(),fl(),fm(),fo(),gg(),gh(),e0=class{constructor(a){a&&(this.architecture=a.architecture,this.vendor=a.vendor)}isArchitecture(a){return this.architecture===a}isVendor(a){return this.vendor===a}},e1=class{constructor(a){this.subgroupsSupported=a.features.has("subgroups"),this.subgroupsF16Supported=a.features.has("subgroups");let b=a.limits;this.subgroupsSupported&&b.minSubgroupSize&&b.maxSubgroupSize?this.subgroupSizeRange=[b.minSubgroupSize,b.maxSubgroupSize]:this.subgroupSizeRange=void 0}},e2=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(null===this.currentKernelId)throw Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let a=this.kernelCustomData.get(this.currentKernelId);return a||(a={},this.kernelCustomData.set(this.currentKernelId,a)),a}async initialize(a,b){this.env=a;let c=[],d={requiredLimits:{maxComputeWorkgroupStorageSize:b.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:b.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:b.limits.maxStorageBufferBindingSize,maxBufferSize:b.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:b.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:b.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:b.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:b.limits.maxComputeWorkgroupSizeZ},requiredFeatures:c},e=a=>b.features.has(a)&&c.push(a)&&!0;e("chromium-experimental-timestamp-query-inside-passes")||e("timestamp-query"),e("shader-f16"),e("subgroups")&&e("subgroups-f16"),this.device=await b.requestDevice(d),this.deviceInfo=new e1(this.device),this.adapterInfo=new e0(b.info||await b.requestAdapterInfo()),this.gpuDataManager=a6(this),this.programManager=new e_(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,aY(a.logLevel,!!a.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:b,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){"u">typeof this.querySet&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let a=this.getCommandEncoder(),b={};"at-passes"===this.queryType&&(b.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:2*this.pendingDispatchNumber,endOfPassWriteIndex:2*this.pendingDispatchNumber+1}),this.computePassEncoder=a.beginComputePass(b)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){let a;this.commandEncoder&&(F(),this.endComputePass(),"none"!==this.queryType&&(this.commandEncoder.resolveQuerySet(this.querySet,0,2*this.pendingDispatchNumber,this.queryResolveBuffer,0),a=this.device.createBuffer({size:2*this.pendingDispatchNumber*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(a,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,a,0,2*this.pendingDispatchNumber*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,"none"!==this.queryType&&a.mapAsync(GPUMapMode.READ).then(()=>{let b=new BigUint64Array(a.getMappedRange()),c=this.pendingQueries.get(a);for(let a=0;a<b.length/2;a++){let d=c[a],e=d.kernelId,f=this.kernels.get(e),g=f.kernelType,h=f.kernelName,i=d.programName,j=d.inputTensorViews,k=d.outputTensorViews,l=b[2*a],m=b[2*a+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=l);let n=Number(l-this.queryTimeBase),o=Number(m-this.queryTimeBase);if(!Number.isSafeInteger(n)||!Number.isSafeInteger(o))throw RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:j.map(a=>({dims:a.dims,dataType:aN(a.dataType)})),outputsMetadata:k.map(a=>({dims:a.dims,dataType:aN(a.dataType)})),kernelId:e,kernelType:g,kernelName:h,programName:i,startTime:n,endTime:o});else{let a="";j.forEach((b,c)=>{a+=`input[${c}]: [${b.dims}] | ${aN(b.dataType)}, `});let b="";k.forEach((a,c)=>{b+=`output[${c}]: [${a.dims}] | ${aN(a.dataType)}, `}),console.log(`[profiling] kernel "${e}|${g}|${h}|${i}" ${a}${b}execution time: ${o-n} ns`)}D("GPU",`${i}::${l}::${m}`)}a.unmap(),this.pendingQueries.delete(a)}),G())}run(a,b,c,d,e,f){var g,h,i;let j,k;F(a.name);let l=[];for(let a=0;a<b.length;++a){let c=b[a].data;if(0===c)continue;let d=this.gpuDataManager.get(c);if(!d)throw Error(`no GPU data for input: ${c}`);l.push(d)}let{outputs:m,dispatchGroup:n,programUniforms:o}=a.getRunData(b),p=0===c.length?m.map((a,b)=>b):c;if(p.length!==m.length)throw Error(`Output size ${p.length} must be equal to ${m.length}.`);let q=[],r=[];for(let a=0;a<m.length;++a){if(!Number.isInteger(p[a])||p[a]<-3||p[a]>=f)throw Error(`Invalid output index: ${p[a]}`);if(-3===p[a])continue;let b=-1===p[a],c=-2===p[a],g=b||c?e(m[a].dataType,m[a].dims):d(p[a],m[a].dataType,m[a].dims);if(q.push(g),0===g.data)continue;let h=this.gpuDataManager.get(g.data);if(!h)throw Error(`no GPU data for output: ${g.data}`);if(b&&this.temporaryData.push(h),c){let a=this.kernelPersistentData.get(this.currentKernelId);a||(a=[],this.kernelPersistentData.set(this.currentKernelId,a)),a.push(h)}r.push(h)}if(l.length!==b.length||r.length!==q.length){if(0===r.length)return G(a.name),q;throw Error(`Program ${a.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}if(o){let a=0,b=[];o.forEach(c=>{let d="number"==typeof c.data?[c.data]:c.data;if(0===d.length)return;let e=10===c.type?2:4,f,g;10===c.type?(g=d.length>4?16:d.length>2?8:d.length*e,f=d.length>4?16:e*d.length):(g=d.length<=2?d.length*e:16,f=16),a=Math.ceil(a/g)*g,b.push(a);let h=10===c.type?8:4;a+=d.length>4?Math.ceil(d.length/h)*f:d.length*e});let c=new ArrayBuffer(a=16*Math.ceil(a/16));o.forEach((a,d)=>{let e=b[d],f="number"==typeof a.data?[a.data]:a.data;if(6===a.type)new Int32Array(c,e,f.length).set(f);else if(12===a.type)new Uint32Array(c,e,f.length).set(f);else if(10===a.type)new Uint16Array(c,e,f.length).set(f);else if(1===a.type)new Float32Array(c,e,f.length).set(f);else throw Error(`Unsupported uniform type: ${aN(a.type)}`)});let d=this.gpuDataManager.create(a,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(d.buffer,0,c,0,a),this.gpuDataManager.release(d.id),j={offset:0,size:a,buffer:d.buffer}}let s=this.programManager.normalizeDispatchGroupSize(n),t=(g=a,h=b,i=1===s[1]&&1===s[2],k=g.name,g.shaderCache?.hint&&(k+="["+g.shaderCache.hint+"]"),k+=":"+i+`:${((a,b)=>{if(b.length!==a.length)throw Error(`inputDependencies length ${b.length} is not equal to inputTensors length ${a.length}.`);let c=[];for(let d=0;d<a.length;++d){let e=a[d].dataType;switch(b[d]){case"none":c.push("");break;case"type":c.push(`${e}`);break;case"rank":{let b=a[d].dims.length;c.push(`${e};${b}`);break}case"dims":{let b=a[d].dims.join(",");c.push(`${e};${b}`);break}default:throw Error(`unsupported input dependency: ${b[d]}`)}}return c.join("|")})(h,g.shaderCache?.inputDependencies??Array(h.length).fill("dims"))}`),u=this.programManager.getArtifact(t);if(u||(u=this.programManager.build(a,s),this.programManager.setArtifact(t,u),aZ("info",()=>`[artifact] key: ${t}, programName: ${a.name}`)),o&&u.uniformVariablesInfo){if(o.length!==u.uniformVariablesInfo.length)throw Error(`Uniform variables count mismatch: expect ${u.uniformVariablesInfo.length}, got ${o.length} in program "${u.programInfo.name}".`);for(let a=0;a<o.length;a++){let b=o[a],c=b.type,d="number"==typeof b.data?1:b.data.length,[e,f]=u.uniformVariablesInfo[a];if(c!==e||d!==f)throw Error(`Uniform variable ${a} mismatch: expect type ${e} with size ${f}, got type ${c} with size ${d} in program "${u.programInfo.name}".`)}}if(aZ("info",()=>`[ProgramManager] run "${a.name}" (key=${t}) with ${s[0]}x${s[1]}x${s[2]}`),"none"!==this.queryType||"capturing"===this.sessionStatus){let a={kernelId:this.currentKernelId,programName:u.programInfo.name,inputTensorViews:b,outputTensorViews:q};this.pendingKernels.push(a),"capturing"===this.sessionStatus&&this.capturedPendingKernels.get(this.currentSessionId).push(a)}return this.programManager.run(u,l,r,s,j),G(a.name),q}upload(a,b){this.gpuDataManager.upload(a,b)}memcpy(a,b){this.gpuDataManager.memcpy(a,b)}async download(a,b){await this.gpuDataManager.download(a,b)}alloc(a){return this.gpuDataManager.create(a).id}free(a){return this.gpuDataManager.release(a)}createKernel(a,b,c,d){let e=e$.get(a);if(!e)throw Error(`kernel not implemented: ${a}`);let f={kernelType:a,kernelName:d,kernelEntry:e[0],attributes:[e[1],c]};this.kernels.set(b,f)}releaseKernel(a){let b=this.kernelPersistentData.get(a);if(b){for(let a of b)this.gpuDataManager.release(a.id);this.kernelPersistentData.delete(a)}this.kernelCustomData.delete(a),this.kernels.delete(a)}computeKernel(a,b,c){let d=this.kernels.get(a);if(!d)throw Error(`kernel not created: ${a}`);let e=d.kernelType,f=d.kernelName,g=d.kernelEntry,h=d.attributes;if(null!==this.currentKernelId)throw Error(`kernel "[${e}] ${f}" is not allowed to be called recursively`);this.currentKernelId=a,h[0]&&(h[1]=h[0](h[1]),h[0]=void 0),aZ("info",()=>`[WebGPU] Start to run kernel "[${e}] ${f}"...`);let i=this.env.debug;this.temporaryData=[];try{return i&&this.device.pushErrorScope("validation"),g(b,h[1]),0}catch(a){return c.push(Promise.resolve(`[WebGPU] Kernel "[${e}] ${f}" failed. ${a}`)),1}finally{for(let a of(i&&c.push(this.device.popErrorScope().then(a=>a?`GPU validation error for kernel "[${e}] ${f}": ${a.message}`:null)),this.temporaryData))this.gpuDataManager.release(a.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(a,b,c,d){let e=this.sessionExternalDataMapping.get(a);e||(e=new Map,this.sessionExternalDataMapping.set(a,e));let f=e.get(b),g=this.gpuDataManager.registerExternalBuffer(c,d,f);return e.set(b,[g,c]),g}unregisterBuffers(a){let b=this.sessionExternalDataMapping.get(a);b&&(b.forEach(a=>this.gpuDataManager.unregisterExternalBuffer(a[0])),this.sessionExternalDataMapping.delete(a))}getBuffer(a){let b=this.gpuDataManager.get(a);if(!b)throw Error(`no GPU data for buffer: ${a}`);return b.buffer}createDownloader(a,b,c){return async()=>{let d=await a4(this,a,b);return a$(d.buffer,c)}}writeTimestamp(a){"inside-passes"===this.queryType&&this.computePassEncoder.writeTimestamp(this.querySet,a)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),"none"!==this.queryType&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:2*this.maxDispatchNumber}),this.queryResolveBuffer=this.device.createBuffer({size:2*this.maxDispatchNumber*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){aZ("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){aZ("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){aZ("info","replay"),this.sessionStatus="replaying";let a=this.capturedCommandList.get(this.currentSessionId),b=this.capturedPendingKernels.get(this.currentSessionId),c=a.length;this.pendingKernels=[];for(let d=0;d<c;d++){let c=this.getComputePassEncoder(),e=a[d];this.writeTimestamp(2*this.pendingDispatchNumber),c.setPipeline(e.computePipeline),c.setBindGroup(0,e.bindGroup),c.dispatchWorkgroups(...e.dispatchGroup),this.writeTimestamp(2*this.pendingDispatchNumber+1),this.pendingDispatchNumber++,"none"!==this.queryType&&this.pendingKernels.push(b[d]),(this.pendingDispatchNumber>=this.maxDispatchNumber||"at-passes"===this.queryType)&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(a){this.unregisterBuffers(a),this.capturedCommandList.has(a)&&this.capturedCommandList.delete(a),this.capturedPendingKernels.has(a)&&this.capturedPendingKernels.delete(a),this.gpuDataManager.onReleaseSession(a)}onRunStart(a){this.currentSessionId=a,this.setQueryType()}}}),gj=O(()=>{fl(),e3=1,e4=()=>e3++,e5=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),e6=(a,b)=>{let c=e5.get(a);if(!c)throw Error("Unsupported data type.");return b.length>0?Math.ceil(b.reduce((a,b)=>a*b)*c/8):0},e7=class{constructor(a){this.sessionId=a.sessionId,this.mlContext=a.context,this.mlTensor=a.tensor,this.dataType=a.dataType,this.tensorShape=a.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return e6(this.dataType,this.tensorShape)}destroy(){aZ("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(a){this.mlContext.writeTensor(this.mlTensor,a)}async read(a){return a?this.mlContext.readTensor(this.mlTensor,a):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(a,b,c){return this.mlContext===a&&this.dataType===b&&this.tensorShape.length===c.length&&this.tensorShape.every((a,b)=>a===c[b])}},e8=class{constructor(a,b){this.tensorManager=a,this.wrapper=b}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(a,b,c,d){let e=this.tensorManager.getMLContext(a);if(this.wrapper){if(this.wrapper.canReuseTensor(e,b,c))return this.wrapper.tensor;if(d){if(this.wrapper.byteLength!==e6(b,c))throw Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let f=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(a,b,c,f,!0,!0),d&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(a){if(this.wrapper)if(a.byteLength===this.wrapper.byteLength)return void this.wrapper.write(a);else aZ("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(a):this.activeUpload=new Uint8Array(a)}async download(a){if(this.activeUpload)if(a)return void(a instanceof ArrayBuffer?new Uint8Array(a).set(this.activeUpload):new Uint8Array(a.buffer,a.byteOffset,a.byteLength).set(this.activeUpload));else return this.activeUpload.buffer;if(!this.wrapper)throw Error("Tensor has not been created.");return a?this.wrapper.read(a):this.wrapper.read()}},e9=class{constructor(a){this.backend=a,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(a){let b=this.backend.getMLContext(a);if(!b)throw Error("MLContext not found for session.");return b}reserveTensorId(){let a=e4();return this.tensorTrackersById.set(a,new e8(this)),a}releaseTensorId(a){let b=this.tensorTrackersById.get(a);b&&(this.tensorTrackersById.delete(a),b.tensorWrapper&&this.releaseTensor(b.tensorWrapper))}async ensureTensor(a,b,c,d,e){aZ("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${b}, dataType: ${c}, shape: ${d}, copyOld: ${e}}`);let f=this.tensorTrackersById.get(b);if(!f)throw Error("Tensor not found.");return f.ensureTensor(a,c,d,e)}upload(a,b){let c=this.tensorTrackersById.get(a);if(!c)throw Error("Tensor not found.");c.upload(b)}async download(a,b){aZ("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${a}, dstBuffer: ${b?.byteLength}}`);let c=this.tensorTrackersById.get(a);if(!c)throw Error("Tensor not found.");return c.download(b)}releaseTensorsForSession(a){for(let b of this.freeTensors)b.sessionId===a&&b.destroy();this.freeTensors=this.freeTensors.filter(b=>b.sessionId!==a)}registerTensor(a,b,c,d){let e=this.getMLContext(a),f=e4(),g=new e7({sessionId:a,context:e,tensor:b,dataType:c,shape:d});return this.tensorTrackersById.set(f,new e8(this,g)),this.externalTensors.add(g),f}async getCachedTensor(a,b,c,d,e,f){let g=this.getMLContext(a);for(let[d,e]of this.freeTensors.entries())if(e.canReuseTensor(g,b,c)){aZ("verbose",()=>`[WebNN] Reusing tensor {dataType: ${b}, shape: ${c}}`);let e=this.freeTensors.splice(d,1)[0];return e.sessionId=a,e}aZ("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${b}, shape: ${c}}`);let h=await g.createTensor({dataType:b,shape:c,dimensions:c,usage:d,writable:e,readable:f});return new e7({sessionId:a,context:g,tensor:h,dataType:b,shape:c})}releaseTensor(a){this.externalTensors.has(a)&&this.externalTensors.delete(a),this.freeTensors.push(a)}},fa=(...a)=>new e9(...a)}),gk=O(()=>{fj(),ff(),fm(),gj(),fl(),fb=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),fc=class{constructor(a){this.tensorManager=fa(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.temporaryGraphInputs=[],this.temporarySessionTensorIds=new Map,aY(a.logLevel,!!a.debug)}get currentSessionId(){if(void 0===this.activeSessionId)throw Error("No active session");return this.activeSessionId}onRunStart(a){aZ("verbose",()=>`[WebNN] onRunStart {sessionId: ${a}}`),this.activeSessionId=a}onRunEnd(a){aZ("verbose",()=>`[WebNN] onRunEnd {sessionId: ${a}}`);let b=this.temporarySessionTensorIds.get(a);if(b){for(let a of b)aZ("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${a}}`),this.tensorManager.releaseTensorId(a);this.temporarySessionTensorIds.delete(a),this.activeSessionId=void 0}}async createMLContext(a){if(a instanceof GPUDevice){let b=this.mlContextCache.findIndex(b=>b.gpuDevice===a);if(-1!==b)return this.mlContextCache[b].mlContext;{let b=await navigator.ml.createContext(a);return this.mlContextCache.push({gpuDevice:a,mlContext:b}),b}}if(void 0===a){let a=this.mlContextCache.findIndex(a=>void 0===a.options&&void 0===a.gpuDevice);if(-1!==a)return this.mlContextCache[a].mlContext;{let a=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:a}),a}}let b=this.mlContextCache.findIndex(b=>((a,b)=>{if(a===b)return!0;if(void 0===a||void 0===b)return!1;let c=Object.keys(a).sort(),d=Object.keys(b).sort();return c.length===d.length&&c.every((c,e)=>c===d[e]&&a[c]===b[c])})(b.options,a));if(-1!==b)return this.mlContextCache[b].mlContext;{let b=await navigator.ml.createContext(a);return this.mlContextCache.push({options:a,mlContext:b}),b}}registerMLContext(a,b){this.mlContextBySessionId.set(a,b);let c=this.sessionIdsByMLContext.get(b);c||(c=new Set,this.sessionIdsByMLContext.set(b,c)),c.add(a),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(a,this.temporaryGraphInputs),this.temporaryGraphInputs=[])}onReleaseSession(a){this.sessionGraphInputs.delete(a);let b=this.mlContextBySessionId.get(a);if(!b)return;this.tensorManager.releaseTensorsForSession(a),this.mlContextBySessionId.delete(a);let c=this.sessionIdsByMLContext.get(b);if(c.delete(a),0===c.size){this.sessionIdsByMLContext.delete(b);let a=this.mlContextCache.findIndex(a=>a.mlContext===b);-1!==a&&this.mlContextCache.splice(a,1)}}getMLContext(a){return this.mlContextBySessionId.get(a)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(a){aZ("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${a}}`),this.tensorManager.releaseTensorId(a)}async ensureTensor(a,b,c,d,e){let f=fb.get(c);if(!f)throw Error(`Unsupported ONNX data type: ${c}`);return this.tensorManager.ensureTensor(a??this.currentSessionId,b,f,d,e)}async createTemporaryTensor(a,b,c){aZ("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${b}, shape: ${c}}`);let d=fb.get(b);if(!d)throw Error(`Unsupported ONNX data type: ${b}`);let e=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(a,e,d,c,!1);let f=this.temporarySessionTensorIds.get(a);return f?f.push(e):this.temporarySessionTensorIds.set(a,[e]),e}uploadTensor(a,b){if(!aG().shouldTransferToMLTensor)throw Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");aZ("verbose",()=>`[WebNN] uploadTensor {tensorId: ${a}, data: ${b.byteLength}}`),this.tensorManager.upload(a,b)}async downloadTensor(a,b){return this.tensorManager.download(a,b)}createMLTensorDownloader(a,b){return async()=>{let c=await this.tensorManager.download(a);return a$(c,b)}}registerMLTensor(a,b,c,d){let e=fb.get(c);if(!e)throw Error(`Unsupported ONNX data type: ${c}`);let f=this.tensorManager.registerTensor(a,b,e,d);return aZ("verbose",()=>`[WebNN] registerMLTensor {tensor: ${b}, dataType: ${e}, dimensions: ${d}} -> {tensorId: ${f}}`),f}registerMLConstant(a,b,c,d,e,f){if(!f)throw Error("External mounted files are not available.");let g=a;a.startsWith("./")&&(g=a.substring(2));let h=f.get(g);if(!h)throw Error(`File with name ${g} not found in preloaded files.`);if(b+c>h.byteLength)throw Error("Out of bounds: data offset and length exceed the external file data size.");let i=h.slice(b,b+c).buffer,j;switch(e.dataType){case"float32":j=new Float32Array(i);break;case"float16":j=new Uint16Array(i);break;case"int32":j=new Int32Array(i);break;case"uint32":j=new Uint32Array(i);break;case"int64":j=new BigInt64Array(i);break;case"uint64":j=new BigUint64Array(i);break;case"int8":j=new Int8Array(i);break;case"int4":case"uint4":case"uint8":j=new Uint8Array(i);break;default:throw Error(`Unsupported data type: ${e.dataType} in creating WebNN Constant from external data.`)}return aZ("verbose",()=>`[WebNN] registerMLConstant {dataType: ${e.dataType}, shape: ${e.shape}}}`),d.constant(e,j)}registerGraphInput(a){this.temporaryGraphInputs.push(a)}isGraphInput(a,b){let c=this.sessionGraphInputs.get(a);return!!c&&c.includes(b)}flush(){}}}),gl={};P(gl,{init:()=>go});var gm,gn,go,gp,gq,gr,gs,gt,gu,gv,gw,gx,gy,gz,gA,gB,gC,gD,gE,gF,gG,gH,gI,gJ,gK,gL,gM,gN,gO,gP,gQ,gR,gS,gT,gU=O(()=>{fj(),gi(),fl(),fq(),gk(),gm=class a{constructor(a,b,c,d){this.module=a,this.dataType=b,this.data=c,this.dims=d}getFloat32Array(){if(1!==this.dataType)throw Error("Invalid data type");let a=bb.size(this.dims);return 0===a?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,a)}getBigInt64Array(){if(7!==this.dataType)throw Error("Invalid data type");let a=bb.size(this.dims);return 0===a?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,a)}getInt32Array(){if(6!==this.dataType)throw Error("Invalid data type");let a=bb.size(this.dims);return 0===a?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,a)}getUint16Array(){if(10!==this.dataType&&4!==this.dataType)throw Error("Invalid data type");let a=bb.size(this.dims);return 0===a?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,a)}reshape(b){if(bb.size(b)!==bb.size(this.dims))throw Error("Invalid new shape");return new a(this.module,this.dataType,this.data,b)}},gn=class{constructor(a,b,c){this.module=a,this.backend=b,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=b.adapterInfo,this.deviceInfo=b.deviceInfo;let d=a.PTR_SIZE,e=c/a.PTR_SIZE,f=4===d?"i32":"i64";this.opKernelContext=Number(a.getValue(d*e++,f));let g=Number(a.getValue(d*e++,f));this.outputCount=Number(a.getValue(d*e++,f)),this.customDataOffset=Number(a.getValue(d*e++,"*")),this.customDataSize=Number(a.getValue(d*e++,f));let h=[];for(let b=0;b<g;b++){let b=Number(a.getValue(d*e++,f)),c=Number(a.getValue(d*e++,"*")),g=Number(a.getValue(d*e++,f)),i=[];for(let b=0;b<g;b++)i.push(Number(a.getValue(d*e++,f)));h.push(new gm(a,b,c,i))}this.inputs=h}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(a,b){let c=b?.inputs?.map(a=>"number"==typeof a?this.inputs[a]:a)??this.inputs,d=b?.outputs??[],e=(a,b,c)=>new gm(this.module,b,this.output(a,c),c),f=(a,b)=>{let c=aO(a,b);if(!c)throw Error(`Unsupported data type: ${a}`);let d=c>0?this.backend.gpuDataManager.create(c).id:0;return new gm(this.module,a,d,b)};return this.backend.run(a,c,d,e,f,this.outputCount)}output(a,b){let c=this.module.stackSave();try{let c=this.module.PTR_SIZE,d=4===c?"i32":"i64",e=this.module.stackAlloc((1+b.length)*c);this.module.setValue(e,b.length,d);for(let a=0;a<b.length;a++)this.module.setValue(e+c*(a+1),b[a],d);return this.module._JsepOutput(this.opKernelContext,a,e)}catch(c){throw Error(`Failed to generate kernel's output[${a}] with dims [${b}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${c}`)}finally{this.module.stackRestore(c)}}},go=async(a,b,c,d)=>{let e=b.jsepInit;if(!e)throw Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if("webgpu"===a){let a=new e2;await a.initialize(c,d),e("webgpu",[a,b=>a.alloc(Number(b)),b=>a.free(b),(c,d,e,f=!1)=>{if(f)aZ("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(c)}, dst=${Number(d)}, size=${Number(e)}`),a.memcpy(Number(c),Number(d));else{aZ("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(c)}, gpuDataId=${Number(d)}, size=${Number(e)}`);let f=b.HEAPU8.subarray(Number(c>>>0),Number(c>>>0)+Number(e));a.upload(Number(d),f)}},async(c,d,e)=>{aZ("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${c}, dataOffset=${d}, size=${e}`),await a.download(Number(c),()=>b.HEAPU8.subarray(Number(d)>>>0,Number(d+e)>>>0))},(c,d,e)=>a.createKernel(c,Number(d),e,b.UTF8ToString(b._JsepGetNodeName(Number(d)))),b=>a.releaseKernel(b),(c,d,e,f)=>{aZ("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${e}, kernel=${c}, contextDataOffset=${d}`);let g=new gn(b,a,Number(d));return a.computeKernel(Number(c),g,f)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else{let a=new fc(c);e("webnn",[a,()=>a.reserveTensorId(),b=>a.releaseTensorId(b),async(b,c,d,e,f)=>a.ensureTensor(b,c,d,e,f),(b,c)=>{a.uploadTensor(b,c)},async(b,c)=>a.downloadTensor(b,c)])}}}),gV=O(()=>{fh(),fi(),fj(),ff(),fg(),fk(),gp=async a=>{var b,c;b=a.wasm.numThreads,c=aQ(a.logLevel),0!==aG()._OrtInit(b,c)&&aJ("Can't initialize onnxruntime.")},gq=async(a,b)=>{{let c=(gU(),Q(gl)).init;if("webgpu"===b){if(typeof navigator>"u"||!navigator.gpu)throw Error("WebGPU is not supported in current environment");let b=a.webgpu.adapter;if(b){if("object"!=typeof b.limits||"object"!=typeof b.features||"function"!=typeof b.requestDevice)throw Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let c=a.webgpu.powerPreference;if(void 0!==c&&"low-power"!==c&&"high-performance"!==c)throw Error(`Invalid powerPreference setting: "${c}"`);let d=a.webgpu.forceFallbackAdapter;if(void 0!==d&&"boolean"!=typeof d)throw Error(`Invalid forceFallbackAdapter setting: "${d}"`);if(!(b=await navigator.gpu.requestAdapter({powerPreference:c,forceFallbackAdapter:d})))throw Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await c("webgpu",aG(),a,b)}if("webnn"===b){if(typeof navigator>"u"||!navigator.ml)throw Error("WebNN is not supported in current environment");await c("webnn",aG(),a)}}},gr=new Map,gs=a=>{let b=aG(),c=b._malloc(a.byteLength);if(0===c)throw Error(`Can't create a session. failed to allocate a buffer of size ${a.byteLength}.`);return b.HEAPU8.set(a,c),[c,a.byteLength]},gt=async(a,b)=>{let c,d,e=aG();Array.isArray(a)?[c,d]=a:a.buffer===e.HEAPU8.buffer?[c,d]=[a.byteOffset,a.byteLength]:[c,d]=gs(a);let f=0,g=0,h=0,i=[],j=[],k=[];try{if([g,i]=aL(b),b?.externalData&&e.mountExternalData){let a=[];for(let c of b.externalData){let b="string"==typeof c?c:c.path;a.push(aU("string"==typeof c?c:c.data).then(a=>{e.mountExternalData(b,a)}))}await Promise.all(a)}for(let a of b?.executionProviders??[])if(("string"==typeof a?a:a.name)==="webnn"){if(e.shouldTransferToMLTensor=!1,"string"!=typeof a){let b=a?.context,c=a?.gpuDevice,d=a?.deviceType,f=a?.powerPreference;b?e.currentContext=b:c?e.currentContext=await e.jsepCreateMLContext(c):e.currentContext=await e.jsepCreateMLContext({deviceType:d,powerPreference:f})}else e.currentContext=await e.jsepCreateMLContext();break}f=await e._OrtCreateSession(c,d,g),0===f&&aJ("Can't create a session."),e.jsepOnCreateSession?.(),e.currentContext&&(e.jsepRegisterMLContext(f,e.currentContext),e.currentContext=void 0,e.shouldTransferToMLTensor=!0);let[a,l]=(a=>{let b=aG(),c=b.stackSave();try{let c=b.PTR_SIZE,d=b.stackAlloc(2*c);0!==b._OrtGetInputOutputCount(a,d,d+c)&&aJ("Can't get session input/output count.");let e=4===c?"i32":"i64";return[Number(b.getValue(d,e)),Number(b.getValue(d+c,e))]}finally{b.stackRestore(c)}})(f),m=!!b?.enableGraphCapture,n=[],o=[],p=[];for(let b=0;b<a;b++){let a=e._OrtGetInputName(f,b);0===a&&aJ("Can't get an input name."),j.push(a),n.push(e.UTF8ToString(a))}for(let a=0;a<l;a++){let c=e._OrtGetOutputName(f,a);0===c&&aJ("Can't get an output name."),k.push(c);let d=e.UTF8ToString(c);o.push(d);{if(m&&b?.preferredOutputLocation===void 0){p.push("gpu-buffer");continue}let a="string"==typeof b?.preferredOutputLocation?b.preferredOutputLocation:b?.preferredOutputLocation?.[d]??"cpu";if("cpu"!==a&&"cpu-pinned"!==a&&"gpu-buffer"!==a&&"ml-tensor"!==a)throw Error(`Not supported preferred output location: ${a}.`);if(m&&"gpu-buffer"!==a)throw Error(`Not supported preferred output location: ${a}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);p.push(a)}}let q=null;return p.some(a=>"gpu-buffer"===a||"ml-tensor"===a)&&(h=e._OrtCreateBinding(f),0===h&&aJ("Can't create IO binding."),q={handle:h,outputPreferredLocations:p,outputPreferredLocationsEncoded:p.map(a=>aT(a))}),gr.set(f,[f,j,k,q,m,!1]),[f,n,o]}catch(a){throw j.forEach(a=>e._OrtFree(a)),k.forEach(a=>e._OrtFree(a)),0!==h&&0!==e._OrtReleaseBinding(h)&&aJ("Can't release IO binding."),0!==f&&0!==e._OrtReleaseSession(f)&&aJ("Can't release session."),a}finally{e._free(c),0!==g&&0!==e._OrtReleaseSessionOptions(g)&&aJ("Can't release session options."),i.forEach(a=>e._free(a)),e.unmountExternalData?.()}},gu=a=>{let b=aG(),c=gr.get(a);if(!c)throw Error(`cannot release session. invalid session id: ${a}`);let[d,e,f,g,h]=c;g&&(h&&0!==b._OrtClearBoundOutputs(g.handle)&&aJ("Can't clear bound outputs."),0!==b._OrtReleaseBinding(g.handle)&&aJ("Can't release IO binding.")),b.jsepOnReleaseSession?.(a),e.forEach(a=>b._OrtFree(a)),f.forEach(a=>b._OrtFree(a)),0!==b._OrtReleaseSession(d)&&aJ("Can't release session."),gr.delete(a)},gv=async(a,b,c,d,e,f=!1)=>{if(!a)return void b.push(0);let g=aG(),h=g.PTR_SIZE,i=a[0],j=a[1],k=a[3],l=k,m,n;if("string"===i&&("gpu-buffer"===k||"ml-tensor"===k))throw Error("String tensor is not supported on GPU.");if(f&&"gpu-buffer"!==k)throw Error(`External buffer must be provided for input/output index ${e} when enableGraphCapture is true.`);if("gpu-buffer"===k){let b=a[2].gpuBuffer;n=aO(aM(i),j);let c=g.jsepRegisterBuffer;if(!c)throw Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');m=c(d,e,b,n)}else if("ml-tensor"===k){let b=a[2].mlTensor;n=aO(aM(i),j);let c=g.jsepRegisterMLTensor;if(!c)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');m=c(d,b,aM(i),j)}else{let b=a[2];if(Array.isArray(b)){n=h*b.length,m=g._malloc(n),c.push(m);for(let a=0;a<b.length;a++){if("string"!=typeof b[a])throw TypeError(`tensor data at index ${a} is not a string`);g.setValue(m+a*h,aH(b[a],c),"*")}}else{let a=g.jsepIsGraphInput;if("string"!==i&&a){let f=g._OrtGetInputName(d,e);if(a(d,g.UTF8ToString(f))){let a=aM(i);n=aO(a,j),l="ml-tensor";let c=g.jsepCreateTemporaryTensor,e=g.jsepUploadTensor;if(!c||!e)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');let f=await c(d,a,j);e(f,new Uint8Array(b.buffer,b.byteOffset,b.byteLength)),m=f}else n=b.byteLength,m=g._malloc(n),c.push(m),g.HEAPU8.set(new Uint8Array(b.buffer,b.byteOffset,n),m)}else n=b.byteLength,m=g._malloc(n),c.push(m),g.HEAPU8.set(new Uint8Array(b.buffer,b.byteOffset,n),m)}}let o=g.stackSave(),p=g.stackAlloc(4*j.length);try{j.forEach((a,b)=>g.setValue(p+b*h,a,4===h?"i32":"i64"));let a=g._OrtCreateTensor(aM(i),m,n,p,j.length,aT(l));0===a&&aJ(`Can't create tensor for input/output. session=${d}, index=${e}.`),b.push(a)}finally{g.stackRestore(o)}},gw=async(a,b,c,d,e,f)=>{let g=aG(),h=g.PTR_SIZE,i=gr.get(a);if(!i)throw Error(`cannot run inference. invalid session id: ${a}`);let j=i[0],k=i[1],l=i[2],m=i[3],n=i[4],o=i[5],p=b.length,q=d.length,r=0,s=[],t=[],u=[],v=[],w=g.stackSave(),x=g.stackAlloc(p*h),y=g.stackAlloc(p*h),z=g.stackAlloc(q*h),A=g.stackAlloc(q*h);try{let i;[r,s]=aK(f);for(let d=0;d<p;d++)await gv(c[d],t,v,a,b[d],n);for(let b=0;b<q;b++)await gv(e[b],u,v,a,p+d[b],n);for(let a=0;a<p;a++)g.setValue(x+a*h,t[a],"*"),g.setValue(y+a*h,k[b[a]],"*");for(let a=0;a<q;a++)g.setValue(z+a*h,u[a],"*"),g.setValue(A+a*h,l[d[a]],"*");if(m&&!o){let{handle:c,outputPreferredLocations:f,outputPreferredLocationsEncoded:h}=m;if(k.length!==p)throw Error(`input count from feeds (${p}) is expected to be always equal to model's input count (${k.length}).`);for(let d=0;d<p;d++){let e=b[d];await g._OrtBindInput(c,k[e],t[d])!==0&&aJ(`Can't bind input[${d}] for session=${a}.`)}for(let b=0;b<q;b++){let i=d[b];e[b]?.[3]?0!==g._OrtBindOutput(c,l[i],u[b],0)&&aJ(`Can't bind pre-allocated output[${b}] for session=${a}.`):0!==g._OrtBindOutput(c,l[i],0,h[i])&&aJ(`Can't bind output[${b}] to ${f[b]} for session=${a}.`)}gr.set(a,[j,k,l,m,n,!0])}g.jsepOnRunStart?.(j),i=m?await g._OrtRunWithBinding(j,m.handle,q,z,r):await g._OrtRun(j,y,x,p,A,q,z,r),0!==i&&aJ("failed to call OrtRun().");let w=[];for(let b=0;b<q;b++){let c=Number(g.getValue(z+b*h,"*"));if(c===u[b]){w.push(e[b]);continue}let f=g.stackSave(),i=g.stackAlloc(4*h),k=!1,l,n=0;try{0!==g._OrtGetTensorData(c,i,i+h,i+2*h,i+3*h)&&aJ(`Can't access output tensor data on index ${b}.`);let e=4===h?"i32":"i64",f=Number(g.getValue(i,e));n=g.getValue(i+h,"*");let j=g.getValue(i+2*h,"*"),o=Number(g.getValue(i+3*h,e)),p=[];for(let a=0;a<o;a++)p.push(Number(g.getValue(j+a*h,e)));0!==g._OrtFree(j)&&aJ("Can't free memory for tensor dims.");let q=p.reduce((a,b)=>a*b,1);l=aN(f);let r=m?.outputPreferredLocations[d[b]];if("string"===l){if("gpu-buffer"===r||"ml-tensor"===r)throw Error("String tensor is not supported on GPU.");let a=[];for(let b=0;b<q;b++){let c=g.getValue(n+b*h,"*"),d=g.getValue(n+(b+1)*h,"*"),e=b===q-1?void 0:d-c;a.push(g.UTF8ToString(c,e))}w.push([l,p,a,"cpu"])}else if("gpu-buffer"===r&&q>0){let a=g.jsepGetBuffer;if(!a)throw Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let b=a(n),d=aO(f,q);if(void 0===d||!aR(l))throw Error(`Unsupported data type: ${l}`);k=!0,w.push([l,p,{gpuBuffer:b,download:g.jsepCreateDownloader(b,d,l),dispose:()=>{0!==g._OrtReleaseTensor(c)&&aJ("Can't release tensor.")}},"gpu-buffer"])}else if("ml-tensor"===r&&q>0){let b=g.jsepEnsureTensor;if(!b)throw Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(void 0===aO(f,q)||!aS(l))throw Error(`Unsupported data type: ${l}`);let d=await b(a,n,f,p,!1);k=!0,w.push([l,p,{mlTensor:d,download:g.jsepCreateMLTensorDownloader(n,l),dispose:()=>{g.jsepReleaseTensorId(n),g._OrtReleaseTensor(c)}},"ml-tensor"])}else{let a=new(aP(l))(q);new Uint8Array(a.buffer,a.byteOffset,a.byteLength).set(g.HEAPU8.subarray(n,n+a.byteLength)),w.push([l,p,a,"cpu"])}}finally{g.stackRestore(f),"string"===l&&n&&g._free(n),k||g._OrtReleaseTensor(c),g.jsepOnRunEnd?.(j)}}return m&&!n&&(0!==g._OrtClearBoundOutputs(m.handle)&&aJ("Can't clear bound outputs."),gr.set(a,[j,k,l,m,n,!1])),w}finally{g.stackRestore(w),t.forEach(a=>g._OrtReleaseTensor(a)),u.forEach(a=>g._OrtReleaseTensor(a)),v.forEach(a=>g._free(a)),0!==r&&g._OrtReleaseRunOptions(r),s.forEach(a=>g._free(a))}},gx=a=>{let b=aG(),c=gr.get(a);if(!c)throw Error("invalid session id");let d=c[0],e=b._OrtEndProfiling(d);0===e&&aJ("Can't get an profile file name."),b._OrtFree(e)},gy=a=>{let b=[];for(let c of a){let a=c[2];!Array.isArray(a)&&"buffer"in a&&b.push(a.buffer)}return b}}),gW=O(()=>{ai(),gV(),ff(),fe(),gz=()=>!!m.wasm.proxy&&"u">typeof document,gB=!1,gC=!1,gD=!1,gG=new Map,gH=(a,b)=>{let c=gG.get(a);c?c.push(b):gG.set(a,[b])},gI=()=>{if(gB||!gC||gD||!gA)throw Error("worker not ready")},gJ=a=>{switch(a.data.type){case"init-wasm":gB=!1,a.data.err?(gD=!0,gF[1](a.data.err)):(gC=!0,gF[0]()),gE&&(URL.revokeObjectURL(gE),gE=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let b=gG.get(a.data.type);a.data.err?b.shift()[1](a.data.err):b.shift()[0](a.data.out)}}},gK=async()=>{if(!gC){if(gB)throw Error("multiple calls to 'initWasm()' detected.");if(gD)throw Error("previous call to 'initWasm()' failed.");if(gB=!0,gz())return new Promise((a,b)=>{gA?.terminate(),ay().then(([c,d])=>{try{(gA=d).onerror=a=>b(a),gA.onmessage=gJ,gF=[a,b];let e={type:"init-wasm",in:m};!e.in.wasm.wasmPaths&&(c||"file:///home/runner/work/veyra/veyra/src/node_modules/onnxruntime-web/dist/ort.webgpu.bundle.min.mjs".startsWith("file:"))&&(e.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm","file:///home/runner/work/veyra/veyra/src/node_modules/onnxruntime-web/dist/ort.webgpu.bundle.min.mjs").href}),gA.postMessage(e),gE=c}catch(a){b(a)}},b)});try{await aF(m.wasm),await gp(m),gC=!0}catch(a){throw gD=!0,a}finally{gB=!1}}},gL=async a=>{if(gz())return gI(),new Promise((b,c)=>{gH("init-ep",[b,c]);let d={type:"init-ep",in:{epName:a,env:m}};gA.postMessage(d)});await gq(m,a)},gM=async a=>gz()?(gI(),new Promise((b,c)=>{gH("copy-from",[b,c]),gA.postMessage({type:"copy-from",in:{buffer:a}},[a.buffer])})):gs(a),gN=async(a,b)=>{if(!gz())return gt(a,b);if(b?.preferredOutputLocation)throw Error('session option "preferredOutputLocation" is not supported for proxy.');return gI(),new Promise((c,d)=>{gH("create",[c,d]);let e={type:"create",in:{model:a,options:{...b}}},f=[];a instanceof Uint8Array&&f.push(a.buffer),gA.postMessage(e,f)})},gO=async a=>{if(gz())return gI(),new Promise((b,c)=>{gH("release",[b,c]),gA.postMessage({type:"release",in:a})});gu(a)},gP=async(a,b,c,d,e,f)=>{if(!gz())return gw(a,b,c,d,e,f);if(c.some(a=>"cpu"!==a[3]))throw Error("input tensor on GPU is not supported for proxy.");if(e.some(a=>a))throw Error("pre-allocated output tensor is not supported for proxy.");return gI(),new Promise((e,g)=>{gH("run",[e,g]),gA.postMessage({type:"run",in:{sessionId:a,inputIndices:b,inputs:c,outputIndices:d,options:f}},gy(c))})},gQ=async a=>{if(gz())return gI(),new Promise((b,c)=>{gH("end-profiling",[b,c]),gA.postMessage({type:"end-profiling",in:a})});gx(a)}}),gX=O(()=>{ai(),gW(),fj(),aj(),fk(),gR=(a,b)=>{switch(a.location){case"cpu":return[a.type,a.dims,a.data,"cpu"];case"gpu-buffer":return[a.type,a.dims,{gpuBuffer:a.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[a.type,a.dims,{mlTensor:a.mlTensor},"ml-tensor"];default:throw Error(`invalid data location: ${a.location} for ${b()}`)}},gS=a=>{switch(a[3]){case"cpu":return new C(a[0],a[2],a[1]);case"gpu-buffer":{let b=a[0];if(!aR(b))throw Error(`not supported data type: ${b} for deserializing GPU tensor`);let{gpuBuffer:c,download:d,dispose:e}=a[2];return C.fromGpuBuffer(c,{dataType:b,dims:a[1],download:d,dispose:e})}case"ml-tensor":{let b=a[0];if(!aS(b))throw Error(`not supported data type: ${b} for deserializing MLTensor tensor`);let{mlTensor:c,download:d,dispose:e}=a[2];return C.fromMLTensor(c,{dataType:b,dims:a[1],download:d,dispose:e})}default:throw Error(`invalid data location: ${a[3]}`)}},gT=class{async fetchModelAndCopyToWasmMemory(a){return gM(await aU(a))}async loadModel(a,b){let c;F(),c="string"==typeof a?await this.fetchModelAndCopyToWasmMemory(a):a,[this.sessionId,this.inputNames,this.outputNames]=await gN(c,b),G()}async dispose(){return gO(this.sessionId)}async run(a,b,c){F();let d=[],e=[];Object.entries(a).forEach(a=>{let b=a[0],c=a[1],f=this.inputNames.indexOf(b);if(-1===f)throw Error(`invalid input '${b}'`);d.push(c),e.push(f)});let f=[],g=[];Object.entries(b).forEach(a=>{let b=a[0],c=a[1],d=this.outputNames.indexOf(b);if(-1===d)throw Error(`invalid output '${b}'`);f.push(c),g.push(d)});let h=d.map((a,b)=>gR(a,()=>`input "${this.inputNames[e[b]]}"`)),i=f.map((a,b)=>a?gR(a,()=>`output "${this.outputNames[g[b]]}"`):null),j=await gP(this.sessionId,e,h,g,i,c),k={};for(let a=0;a<j.length;a++)k[this.outputNames[g[a]]]=f[a]??gS(j[a]);return G(),k}startProfiling(){}endProfiling(){gQ(this.sessionId)}}}),gY={};P(gY,{OnnxruntimeWebAssemblyBackend:()=>g$,initializeFlags:()=>gZ,wasmBackend:()=>g_});var gZ,g$,g_,g0=O(()=>{ai(),gW(),gX(),gZ=()=>{if(("number"!=typeof m.wasm.initTimeout||m.wasm.initTimeout<0)&&(m.wasm.initTimeout=0),!1===m.wasm.simd&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),"boolean"!=typeof m.wasm.proxy&&(m.wasm.proxy=!1),"boolean"!=typeof m.wasm.trace&&(m.wasm.trace=!1),"number"!=typeof m.wasm.numThreads||!Number.isInteger(m.wasm.numThreads)||m.wasm.numThreads<=0)if("u">typeof self&&!self.crossOriginIsolated)m.wasm.numThreads=1;else{let a=typeof navigator>"u"?N("node:os").cpus().length:navigator.hardwareConcurrency;m.wasm.numThreads=Math.min(4,Math.ceil((a||1)/2))}},g_=new(g$=class{async init(a){gZ(),await gK(),await gL(a)}async createInferenceSessionHandler(a,b){let c=new gT;return await c.loadModel(a,b),Promise.resolve(c)}})});ai(),ai(),ai();var g1=ah;{let a=(g0(),Q(gY)).wasmBackend;g("webgpu",a,5),g("webnn",a,5),g("cpu",a,10),g("wasm",a,10)}Object.defineProperty(m.versions,"web",{value:"1.21.0",enumerable:!0})}};