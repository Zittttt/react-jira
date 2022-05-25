import { BugOutlined, CheckOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { Avatar, Button, InputNumber, Select, Slider } from "antd";
import Input from "antd/lib/input/Input";
import TextArea from "antd/lib/input/TextArea";
import React, { useRef } from "react";

const { Option } = Select;

export default function EditTaskFormComponent() {
  const editorRef = useRef(null);

  const editorHandleChange = (content, editor) => {
    console.log(content);
    // setValues({ ...values, description: content });
  };

  return (
    <div>
      <div className="left-side grid grid-cols-3 -mx-3 mb-5">
        <div className="w-full px-3 col-span-2">
          <div className="col-span-2">
            <Select
              defaultValue={"bug"}
              className="text-[13px]"
              optionFilterProp="label"
              bordered={false}
            >
              <Option value="bug" label="bug">
                <div className="flex items-center">
                  <BugOutlined className="bg-red-500 mr-2 text-white p-1 rounded-full" />
                  <span>bug</span>
                </div>
              </Option>
              <Option value="new task" label="new task">
                <div className="flex items-center">
                  <CheckOutlined className="bg-cyan-500 mr-2 text-white p-1 rounded-full" />
                  <span>new task</span>
                </div>
              </Option>
            </Select>
          </div>
        </div>
      </div>
      <div className="left-side grid grid-cols-3 -mx-3 mb-5">
        <div className="w-full px-3 col-span-2">
          <Input
            // bordered={false}
            className="text-[24px] font-medium rounded-md border-transparent hover:border-blue-400 transition-all duration-300"
            value="This is an issue of type: Task."
          />
        </div>
        <div className="w-full px-3">
          <label className="text-[12.5px] font-medium block">STATUS</label>
          <Select
            style={{ width: "50%" }}
            defaultValue="BACKLOG"
            className="text-[13px]"
            optionFilterProp="label"
          >
            <Option value="BACKLOG">BACKLOG</Option>
            <Option value="BACKLOG">BACKLOG</Option>
            <Option value="BACKLOG">BACKLOG</Option>
            <Option value="BACKLOG">BACKLOG</Option>
          </Select>
        </div>
      </div>
      <div className="left-side grid grid-cols-3 -mx-3 mb-5 pl-3">
        <div className="w-full px-3 col-span-2">
          <label className="text-[15px] font-medium">Description</label>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            onEditorChange={editorHandleChange}
            name="description"
            id="description"
            init={{
              height: 350,
              menubar: false,
              plugins: [
                "a11ychecker",
                "advlist",
                "advcode",
                "advtable",
                "autolink",
                "checklist",
                "export",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "powerpaste",
                "fullscreen",
                "formatpainter",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
                "onEditorChange",
              ],
              toolbar:
                "undo redo | casechange blocks | bold italic backcolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
        <div className="w-full px-3">
          <div className="mb-5">
            <label className="text-[12.5px] font-medium block">ASSIGNESS</label>
            <Select
              style={{ width: "50%" }}
              defaultValue="BACKLOG"
              className="text-[13px]"
              optionFilterProp="label"
            >
              <Option value="BACKLOG">BACKLOG</Option>
              <Option value="BACKLOG">BACKLOG</Option>
              <Option value="BACKLOG">BACKLOG</Option>
              <Option value="BACKLOG">BACKLOG</Option>
            </Select>
          </div>

          <div className="mb-5">
            <label className="text-[12.5px] font-medium block">PRIORITY</label>
            <Select
              style={{ width: "50%" }}
              defaultValue="HIGH"
              className="text-[13px]"
              optionFilterProp="label"
            >
              <Option value="HIGH">HIGH</Option>
              <Option value="MEDIUM">MEDIUM</Option>
              <Option value="LOW">LOW</Option>
              <Option value="LOWEST">LOWEST</Option>
            </Select>
          </div>
          <div className="mb-5">
            <label className="text-[12.5px] font-medium block">
              ORIGINAL ESTIMATE (HOURS)
            </label>
            <InputNumber style={{ width: "100%" }} />
          </div>

          <div className="mb-5">
            <label className="text-[12.5px] font-medium block">
              TIME TRACKING
            </label>
            <Slider
              //   value={timeTracking.timeTrackingSpent}
              max={20}
              tooltipPlacement="right"
            />
            <div className="grid grid-cols-2 mb-2">
              <span className="text-green-500 font-bold">h logged</span>
              <span className="text-right text-red-500 font-bold">
                h remaining
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Time spent (hours)
                </label>
                <InputNumber
                  className="w-full"
                  name="timeTrackingSpent"
                  min={0}
                  defaultValue={0}
                  type="number"
                />
              </div>
              <div>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Time remaining (hours)
                </label>
                <InputNumber
                  className="w-full"
                  name="timeTrackingRemaining"
                  min={0}
                  defaultValue={0}
                  type="number"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="left-side grid grid-cols-3 -mx-3 mb-5 pl-3">
        <div className="w-full px-3 col-span-2">
          <label className="text-[15px] font-medium">Comments</label>
          <div className="flex justify-between">
            <div className="mr-2 mt-2">
              <Avatar />
            </div>
            <TextArea placeholder="Add a comment..." className="w-full" />
            <Button>Send</Button>
          </div>
          <li>
            <ul className="mt-5">
              <div className="info flex">
                <div className="mr-2">
                  <Avatar />
                </div>
                <div>
                  <span className="font-medium text-[15px] pr-[12px]">
                    Lord Gaben
                  </span>
                  <span className="text-[14.5px]">an hour ago</span>
                </div>
              </div>
              <div className="comment-content pl-[40px] ">
                <p className="text-[15px]">
                  An old silent pond... A frog jumps into the pond, splash!
                  Silence again.
                </p>
                <button className="text-[14.5px] mr-2">Edit</button>
                <button className="text-[14.5px]">Delete</button>
              </div>
            </ul>
          </li>
        </div>
      </div>

      {/* <div>
          <p>Description</p>
          <button>Save</button>
          <button>Cancel</button>
        </div>
        <div className="comment">
          <h3>Comment</h3>
          <input type="text" placeholder="Add a comment" />
          <li>
            <ul>
              <div className="top">
                <span>Lord Gaben</span>
                <span>38 minutes ago</span>
              </div>
              <div>
                An old silent pond... A frog jumps into the pond, splash!
                Silence again.
              </div>
              <span>Edit</span>
              <span>Delete</span>
            </ul>
          </li>
        </div> */}
    </div>
  );
}
