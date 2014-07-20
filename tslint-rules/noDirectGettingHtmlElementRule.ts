/// <reference path='../typings/tslint/tslint.d.ts' />

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "Getting HTML element direct is not allowed. HTML element should be passed by constructor or arguments.";

    public apply(syntaxTree: TypeScript.SyntaxTree): Lint.RuleFailure[] {
        return this.applyWithWalker(<Lint.RuleWalker>(new NoDirectGettingHtmlElementWalker(syntaxTree, this.getOptions())));
    }
}

class NoDirectGettingHtmlElementWalker extends Lint.RuleWalker {
    static jQueryPattern: RegExp = /(?:jQuery|\$|jQ)\(["'][^)]+["']\)/g ;

    public visitInvocationExpression(node: TypeScript.InvocationExpressionSyntax): void {
        if(node.fullText().match(NoDirectGettingHtmlElementWalker.jQueryPattern)){
            var position = this.position() + node.leadingTriviaWidth();
            this.addFailure(this.createFailure(position, node.width(), Rule.FAILURE_STRING));
        }
    }
}
