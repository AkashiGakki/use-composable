<script setup lang="ts">
</script>

<template>
  <div class="tree">
    <details>
      <summary>
        <span class="tree-item">项目1</span>
      </summary>
      <details>
        <summary>
          <span class="tree-item">文件夹0</span>
        </summary>
      </details>
      <details>
        <summary>
          <span class="tree-item">文件夹1-1</span>
        </summary>
        <details>
          <summary>
            <span class="tree-item">文件夹1-1-2</span>
          </summary>
        </details>
        <details>
          <summary>
            <span class="tree-item">文件夹1-1-3</span>
          </summary>
          <details>
            <summary>
              <span class="tree-item">文件夹1-1-3-1</span>
            </summary>
          </details>
          <details>
            <summary>
              <span class="tree-item">文件夹1-1-3-2</span>
            </summary>
          </details>
        </details>
        <details>
          <summary>
            <span class="tree-item">文件夹1-1-4</span>
          </summary>
        </details>
      </details>
      <details>
        <summary>
          <span class="tree-item">文件夹1-2</span>
        </summary>
        <details>
          <summary>
            <span class="tree-item">文件夹1-2-1</span>
          </summary>
        </details>
      </details>
      <details>
        <summary>
          <span class="tree-item">文件夹1-3</span>
        </summary>
      </details>
      <details>
        <summary>
          <span class="tree-item">文件夹1-4</span>
        </summary>
      </details>
    </details>
  </div>
</template>

<style scoped>
details{
  padding-left: 10px
}

summary{
  list-style: no ne;
  background: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.354 2.646A.5.5 0 0 0 4.5 3v6a.5.5 0 0 0 .854.354l3-3a.5.5 0 0 0 0-.708l-3-3z' fill='%23000' fill-opacity='.45'/%3E%3C/svg%3E") 4px center no-repeat;
}

details[open] > summary{
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.354 5.354A.5.5 0 0 0 9 4.5H3a.5.5 0 0 0-.354.854l3 3a.5.5 0 0 0 .708 0l3-3z' fill='%23000' fill-opacity='.45'/%3E%3C/svg%3E");
}

summary:not(:only-child){
  background: url("xxx") 4px center no-repeat;
}

details[open] > summary:not(:only-child){
  background-image: url("xxx");
}

.tree-item:hover{
  background: aliceblue;
}

.tree-item{
  padding-left: 400px;
  margin-left: -400px;
}

.tree{
  overflow: auto;
  position: relative;
}

.tree-item::after{
    content: '';
    position: absolute;
    left: 10px;
    right: 10px;/*水平方向的尺寸依赖于父级.tree*/
    height: 38px;
    background: #EEF2FF;
    border-radius: 8px;
    z-index: -1;
    opacity: 0;
    transition: .2s;
}

.tree-item:hover::after{
    opacity: 1;
}

.tree-item::before{
  content: '';
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-right: 8px;
  background: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M.833 3.75c0-.92.746-1.667 1.667-1.667h5.417c.247 0 .481.11.64.3l1.833 2.2h7.11c.92 0 1.667.747 1.667 1.667v10c0 .92-.747 1.667-1.667 1.667h-15c-.92 0-1.667-.746-1.667-1.667V3.75zm6.693 0H2.5v4.584h15V6.25H10a.833.833 0 0 1-.64-.3l-1.834-2.2zM17.5 10h-15v6.25h15V10z' fill='%23000' fill-opacity='.45'/%3E%3C/svg%3E") center no-repeat;
}

details[open]>summary:not(:only-child)>.tree-item::before{
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.917 2.083c.247 0 .481.11.64.3l1.833 2.2h5.443c.92 0 1.667.747 1.667 1.667v1.667h.833a.833.833 0 0 1 .817.997l-1.666 8.333a.833.833 0 0 1-.817.67H1.677a.814.814 0 0 1-.157-.013.83.83 0 0 1-.687-.82V3.75c0-.92.746-1.667 1.667-1.667h5.417zM10 6.25a.833.833 0 0 1-.64-.3l-1.834-2.2H2.5v6.564l.441-1.766a.833.833 0 0 1 .809-.631h12.083V6.25H10zm-7.266 10L4.4 9.584h12.916l-1.334 6.666H2.733z' fill='%23000' fill-opacity='.45'/%3E%3C/svg%3E");
}
</style>
