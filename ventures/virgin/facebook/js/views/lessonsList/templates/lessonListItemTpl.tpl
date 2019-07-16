
<div class="p-bar">
  <div></div>
</div>

<span class="sash">
  <p class="unlock-level-num">{{unlockLevel}}</p>
</span>

<div class="l-wrppr">
  <div class="l-inf">
    <div class="icon"></div>
    <div class="l-in-inf">
      <h2>{{title}}</h2>
      <p>{{tip}}</p>
    </div>
  </div>

  <div class="ch-in">
    <h2>{{awardTitle}}</h2>
    <p>{{challengeCriteria}}</p>
  </div>

  <div class="re-inf">
    <span class="icon">
      {{#if awardRef}}
      <span class="list-item-trophy-icon {{awardRef}}"></span>
      {{/if}}
    </span>
    <h2>{{awardXp}} XP</h2>
  </div>
</div>