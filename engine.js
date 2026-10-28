import {getPuzzle} from './puzzles.js';
export const VERSION=2;
export function makeState(n=6,puzzle='minions'){if(!getPuzzle(puzzle))throw new Error('Unknown puzzle');return {version:VERSION,n,puzzle,started:Date.now(),finished:null,revision:0,pieces:Array.from({length:n*n},(_,id)=>({id,placed:false,by:null,lock:null,at:0}))};}
export function edge(id,n){const x=id%n,y=Math.floor(id/n);return x===0||y===0||x===n-1||y===n-1;}
export function target(id,n){return {x:(id%n+.5)/n,y:(Math.floor(id/n)+.5)/n};}
export function apply(state,action,actor,now=Date.now()){
 if(!state||!action||!['host','guest'].includes(actor))return false;
 const p=state.pieces[action.id];if(!p||!Number.isInteger(action.id)||p.placed)return false;
 if(action.type==='take'){if(p.lock&&p.lock!==actor&&now-p.at<30000)return false;for(const q of state.pieces)if(q.lock===actor){q.lock=null;q.at=0;}p.lock=actor;p.at=now;}
 else if(action.type==='release'){if(p.lock!==actor)return false;p.lock=null;p.at=0;}
 else if(action.type==='drop'){if(p.lock!==actor||!Number.isFinite(action.x)||!Number.isFinite(action.y))return false;const t=target(p.id,state.n);if(Math.hypot(t.x-action.x,t.y-action.y)<.43/state.n){p.placed=true;p.by=actor;}p.lock=null;p.at=0;}
 else return false;
 state.revision++;if(state.pieces.every(q=>q.placed))state.finished=now;return true;
}
export function releaseActor(state,actor){let changed=false;for(const p of state.pieces)if(p.lock===actor){p.lock=null;p.at=0;changed=true;}if(changed)state.revision++;return changed;}
export function validState(s){return s&&s.version===VERSION&&!!getPuzzle(s.puzzle)&&[4,6,8].includes(s.n)&&Number.isFinite(s.started)&&Number.isInteger(s.revision)&&Array.isArray(s.pieces)&&s.pieces.length===s.n*s.n&&s.pieces.every((p,i)=>p.id===i&&typeof p.placed==='boolean'&&[null,'host','guest'].includes(p.lock)&&[null,'host','guest'].includes(p.by));}
// Each edge is drawn clockwise. Matching adjacent edges traverse the same curve backwards.
export function piecePath(id,n,Path=globalThis.Path2D){const p=new Path(),x=id%n,y=Math.floor(id/n);p.moveTo(0,0);const sign=(a,b)=>((a*13+b*7)%2?1:-1);const sides=[y===0?0:-sign(x,y-1),x===n-1?0:sign(x,y),y===n-1?0:sign(x,y),x===0?0:-sign(x-1,y)];const xy=(side,a,b)=>side===0?[a,b]:side===1?[1-b,a]:side===2?[1-a,1-b]:[b,1-a];for(let s=0;s<4;s++){const line=(a,b)=>p.lineTo(...xy(s,a,b));const curve=(a,b,c,d,e,f)=>p.bezierCurveTo(...xy(s,a,b),...xy(s,c,d),...xy(s,e,f));const k=sides[s];if(!k){line(1,0);continue;}line(.35,0);curve(.45,0,.36,-.1*k,.37,-.14*k);curve(.38,-.26*k,.62,-.26*k,.63,-.14*k);curve(.64,-.1*k,.55,0,.65,0);line(1,0);}p.closePath();return p;}
