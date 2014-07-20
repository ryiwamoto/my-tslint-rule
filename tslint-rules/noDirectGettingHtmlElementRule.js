var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (syntaxTree) {
        return this.applyWithWalker((new NoDirectGettingHtmlElementWalker(syntaxTree, this.getOptions())));
    };
    Rule.FAILURE_STRING = "Getting HTML element direct is not allowed. HTML element should be passed by constructor or arguments.";
    return Rule;
})(Lint.Rules.AbstractRule);
exports.Rule = Rule;

var NoDirectGettingHtmlElementWalker = (function (_super) {
    __extends(NoDirectGettingHtmlElementWalker, _super);
    function NoDirectGettingHtmlElementWalker() {
        _super.apply(this, arguments);
    }
    NoDirectGettingHtmlElementWalker.prototype.visitInvocationExpression = function (node) {
        if (node.fullText().match(NoDirectGettingHtmlElementWalker.jQueryPattern)) {
            var position = this.position() + node.leadingTriviaWidth();
            this.addFailure(this.createFailure(position, node.width(), Rule.FAILURE_STRING));
        }
    };
    NoDirectGettingHtmlElementWalker.jQueryPattern = /(?:jQuery|\$|jQ)\(["'][^)]+["']\)/g;
    return NoDirectGettingHtmlElementWalker;
})(Lint.RuleWalker);
