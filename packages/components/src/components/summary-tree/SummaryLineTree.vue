<script></script>

<template>
  <div id="tree" class="tree">
    <details>
      <summary class="tree-item">
        项目1
      </summary>
      <details>
        <summary class="tree-item">
          文件夹
        </summary>
        <details>
          <summary class="tree-item">
            sdd
          </summary>
        </details>
      </details>
      <details>
        <summary class="tree-item">
          chrome test
        </summary>
      </details>
    </details>
    <details>
      <summary class="tree-item">
        项目2
      </summary>
      <details>
        <summary class="tree-item">
          文件夹2-1
        </summary>
        <details>
          <summary class="tree-item">
            文件夹2-1-1
          </summary>
          <details>
            <summary class="tree-item">
              文件夹2-1-1-1
            </summary>
            <details>
              <summary class="tree-item">
                文件夹2-1-1-1-1
              </summary>
              <details>
                <summary class="tree-item">
                  文件夹2-1-1-1-1-1
                </summary>
              </details>
            </details>
          </details>
        </details>
      </details>
    </details>
    <details>
      <summary class="tree-item">
        文件夹1
      </summary>
      <details>
        <summary class="tree-item">
          文件夹
        </summary>
      </details>
      <details>
        <summary class="tree-item">
          文件夹2
        </summary>
      </details>
    </details>
    <details>
      <summary class="tree-item">
        项目3
      </summary>
      <details>
        <summary class="tree-item">
          文件夹1
        </summary>
        <details>
          <summary class="tree-item">
            1
          </summary>
          <details>
            <summary class="tree-item">
              文件夹2
            </summary>
          </details>
        </details>
      </details>
      <details>
        <summary class="tree-item">
          文件夹
        </summary>
      </details>
      <details>
        <summary class="tree-item">
          文件夹
        </summary>
      </details>
      <details>
        <summary class="tree-item">
          文件夹
        </summary>
      </details>
      <details>
        <summary class="tree-item">
          文件夹的副本
        </summary>
      </details>
      <details>
        <summary class="tree-item">
          点点点
        </summary>
      </details>
      <details>
        <summary class="tree-item">
          hewei
        </summary>
        <details>
          <summary class="tree-item">
            hewei02
          </summary>
        </details>
      </details>
    </details>
  </div>
</template>

<style scoped>
.tree {
  flex: 1;
  overflow: auto;
  padding: 4px 0;
  position: relative;
}
.tree summary {
  outline: 0;
  padding-left: 30px;
  list-style: none;
  background: repeating-linear-gradient(90deg, #999 0 1px, transparent 0px 2px)
    0px 50%/20px 1px no-repeat;
  /* background: linear-gradient(#999,#999) 0px 50%/20px 1px no-repeat; */
}
.tree details:last-child {
  background-size: 1px 23px;
}
.tree > details:not(:last-child) > details:last-child {
  background-size: 1px 100%;
}
.tree details {
  padding-left: 40px;
  background: repeating-linear-gradient(#999 0 1px, transparent 0px 2px) 40px
    0px/1px 100% no-repeat;
  /* background: linear-gradient(#999, #999) 40px 0px/1px 100% no-repeat; */
}
.tree > details {
  background: none;
  padding-left: 0;
}
.tree > details > summary {
  background: none;
}
.tree summary {
  display: flex;
  align-items: center;
  height: 46px;
  font-size: 15px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.85);
  cursor: default;
}
.tree summary::after {
  content: "";
  position: absolute;
  left: 10px;
  right: 10px;
  height: 38px;
  background: #eef2ff;
  border-radius: 8px;
  z-index: -1;
  opacity: 0;
  transition: 0.2s;
}
.tree summary:hover::after {
  opacity: 1;
}
.tree summary:not(:only-child)::before {
  content: "";
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  margin-right: 8px;
  border: 1px solid #999;
  background: linear-gradient(#999, #999) 50%/1px 10px no-repeat,
    linear-gradient(#999, #999) 50%/10px 1px no-repeat;
}
.tree details[open] > summary::before {
  background: linear-gradient(#999, #999) 50%/10px 1px no-repeat;
}
</style>
